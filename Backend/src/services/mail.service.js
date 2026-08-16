import { createTransport } from "nodemailer";
import "dotenv/config"

const transport = createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
});

export const sendEmail = async ({ to, html, text,subject }) => {
  const info = {
    from: process.env.GOOGLE_USER,
    to,
    text,
    html,
   subject,
  };

    await transport.sendMail({ info });
    
};
