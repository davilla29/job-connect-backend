import { mailjet } from "./mailjet.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "../templates/mail/emailTemplates.js";

const SENDER_NAME = "JobConnect";

export const sendVerificationEmail = async (email, name, verificationToken) => {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace("{userName}", name).replace(
    "{verificationCode}",
    verificationToken,
  );

  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
            Name: process.env.MAIL_FROM_NAME || SENDER_NAME,
          },
          To: [{ Email: email, Name: name }],
          Subject: "Verify your email",
          HTMLPart: html,
        },
      ],
    });

    console.log("✅ Verification email sent");
    return result.body;
  } catch (error) {
    console.error(
      "❌ Mailjet Verification error:",
      error.response?.data || error,
    );
    throw new Error("Verification email error");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const html = WELCOME_EMAIL_TEMPLATE.replace("{userName}", name);

  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
            Name: process.env.MAIL_FROM_NAME || SENDER_NAME,
          },
          To: [{ Email: email, Name: name }],
          Subject: "Welcome!",
          HTMLPart: html,
        },
      ],
    });

    console.log("✅ Welcome email sent");
    return result.body;
  } catch (error) {
    console.error("❌ Mailjet Welcome error:", error.response?.data || error);
    throw new Error("Welcome email error");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);

  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
            Name: process.env.MAIL_FROM_NAME || SENDER_NAME,
          },
          To: [{ Email: email }],
          Subject: "Reset Your Password",
          HTMLPart: html,
        },
      ],
    });

    console.log("✅ Password reset email sent");
    return result.body;
  } catch (error) {
    console.error(
      "❌ Mailjet Password reset error:",
      error.response?.data || error,
    );
    throw new Error("Password reset email error");
  }
};

export const sendResetSuccessEmail = async (email) => {
  const html = PASSWORD_RESET_SUCCESS_TEMPLATE;

  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
            Name: process.env.MAIL_FROM_NAME || SENDER_NAME,
          },
          To: [{ Email: email }],
          Subject: "Password Reset Successful",
          HTMLPart: html,
        },
      ],
    });

    console.log("✅ Reset success email sent");
    return result.body;
  } catch (error) {
    console.error(
      "❌ Mailjet Reset success error:",
      error.response?.data || error,
    );
    throw new Error("Reset success email error");
  }
};
