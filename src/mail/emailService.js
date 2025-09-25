import { transporter } from "./smtp.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

const senderEmail = '"Bolarinwa David" <bolarinwadavid3@gmail.com>';

export const sendVerificationEmail = async (email, name, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: senderEmail,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{userName}", name).replace(
        "{verificationCode}",
        verificationToken
      ),
    });

    console.log("Verification email sent:", info.messageId);
  } catch (error) {
    console.error("Failed to send verification email", error);
    throw new Error(`Verification email error: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const html = WELCOME_EMAIL_TEMPLATE.replace("{userName}", name);

    const info = await transporter.sendMail({
      from: senderEmail,
      to: email,
      subject: "Welcome!",
      html,
    });

    console.log("Welcome email sent:", info.messageId);
  } catch (error) {
    throw new Error(`Welcome email error: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetURL
    );

    const info = await transporter.sendMail({
      from: senderEmail,
      to: email,
      subject: "Reset Your Password",
      html,
    });

    console.log("Password reset email sent:", info.messageId);
  } catch (error) {
    throw new Error(`Password reset email error: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: senderEmail,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset success email sent:", info.messageId);
  } catch (error) {
    throw new Error(`Reset success email error: ${error}`);
  }
};



