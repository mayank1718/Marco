import "dotenv/config";
import { tavily as Tavily } from "@tavily/core";

const tavily = Tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export const searchInput = async ({ query }) => {
  console.log(query);
  const response = await tavily.search({
    query,
  });
  console.log(response);
  return JSON.stringify(response, null, 2);
};
