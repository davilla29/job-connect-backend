import { transporter } from "./smtp.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
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



