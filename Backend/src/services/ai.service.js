import { AIMessage, createAgent, HumanMessage, SystemMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";
import { searchInput } from "./internet.service.js";
import { tool } from "langchain";
import * as z from "zod";
import { sendEmail } from "./mail.service.js";
import { searchWeather } from "./weather.service.js";
import { mathCal } from "./math.service.js";
import { getMemory, saveMemory } from "./memory.service.js";

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apikey: process.env.MISTRAL_API_KEY,
});

const webSearchTool = tool(searchInput, {
  name: "WebSearch",
  description: "Search the web for information",
  schema: z.object({
    query: z.string().describe("The search query"),
  }),
});

const mailSender = tool(sendEmail, {
  name: "MailSender",
  description:
    "Send an email only after the user explicitly confirms the generated email.The user may provide only the recipient email address and subject.First, generate a short, professional email containing only the important detailsand show the complete email preview to the user.Do NOT send the email immediately after generating the draft.Wait for explicit confirmation from the user such as done, send, yes, or confirm.Only after explicit confirmation, call this tool to send the email.If the user asks for changes, update the draft and show the revised preview again.Keep emails concise, clear, professional, and focused only on essential information.Never invent important facts, dates, names, attachments, or commitments that the user did not provide.",
  schema: z.object({
    to: z.string().describe("The email address of the recipient"),
    subject: z.string().describe("The subject of the email"),
    text: z.string().describe("The plain text content of the email"),
    html: z.string().describe("The HTML content of the email"),
  }),
});

const weatherTool = tool(searchWeather, {
  name: "current-weather",
  description: `Get the current weather information for a specified city.

Use this tool when the user asks about current weather, temperature,
weather conditions, humidity, wind speed, or similar weather information.

Return only important weather details such as city, temperature,
weather condition, humidity, and wind speed.

Do not use this tool for historical weather information unless the API supports it.`,
  schema: z.object({
    city: z.string().describe("City you search weather"),
  }),
});

const getCurrentDateTime = tool(
  async () => {
    return new Date().toString();
  },
  {
    name: "get_current_date_time",
    description: "Get the current date and time.",
    schema: z.object({}),
  },
);

const saveMemoryTool = tool(
  async ({ memory }, runtime) => {
    const userId = runtime.context.userId;
    return await saveMemory({
      memory,
      userId,
    });
  },
  {
    name: "save-memory",
    description:
      "Save important, user-specific information that should be remembered across future conversations.",
    schema: z.object({
      memory: z.string().describe("Important user information to remember"),
    }),
  },
);

const searchMemoryTool = tool(
  async (_, runtime) => {
    const userId = runtime.context.userId;
    return await getMemory({ userId });
  },
  {
    name: "search-memory",
    description:
      "Retrieve the user's saved memories that are relevant to the current conversation. Use this tool to access previously stored information that may help provide context or continuity in the conversation. This tool is useful for recalling important details, preferences, or any other information that the user has chosen to save for future reference. Use this tool when the user asks about previously saved information or when you need to reference past interactions to provide a more informed response. Give a concise summary of the relevant memories without repeating unnecessary details.",
    schema: z.object({}),
  },
);

const calculatorTool = tool(mathCal, {
  name: "calculator",
  description: `
      Perform mathematical calculations accurately.
      Use this tool when the user asks for arithmetic or mathematical
      calculations such as addition, subtraction, multiplication,
      division, percentages, powers, square roots, or expressions.
    `,
  schema: z.object({
    exp: z.string(),
  }),
});

const tools = [
  webSearchTool,
  mailSender,
  searchMemoryTool,
  weatherTool,
  getCurrentDateTime,
  saveMemoryTool,
  calculatorTool,
];
const agent = createAgent({
  model: mistralModel,
  tools,
  contextSchema: z.object({
    userId: z.string(),
  }),
});

export async function generateMessage(messages, userId) {
  const response = await agent.invoke(
    {
      messages: [
        new SystemMessage(
          "You are a helpful assistant that provides responses to user messages.",
        ),
        ...messages.map((msg) => {
          if (msg.role === "user") {
            return new HumanMessage(msg.content);
          }

          if (msg.role === "ai") {
            return new AIMessage(msg.content);
          }
        }),
      ],
    },
    {
      context: {
        userId: userId,
      },
    },
  );

  return response.messages[response.messages.length - 1].content;
}

export async function generateTitle(message) {
  const title = await mistralModel.invoke([
    new SystemMessage(
      "Generate a short, clear title that summarizes the user's conversation.",
    ),
    new HumanMessage(message),
  ]);
  return title.content;
}
