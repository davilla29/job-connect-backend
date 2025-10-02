// import { transporter } from "./smtp.config.js";
// import {
//   VERIFICATION_EMAIL_TEMPLATE,
//   WELCOME_EMAIL_TEMPLATE,
//   PASSWORD_RESET_REQUEST_TEMPLATE,
//   PASSWORD_RESET_SUCCESS_TEMPLATE,
// } from "./emailTemplates.js";

// const senderEmail = '"Bolarinwa David" <bolarinwadavid3@gmail.com>';

// export const sendVerificationEmail = async (email, name, verificationToken) => {
//   try {
//     const info = await transporter.sendMail({
//       from: senderEmail,
//       to: email,
//       subject: "Verify your email",
//       html: VERIFICATION_EMAIL_TEMPLATE.replace("{userName}", name).replace(
//         "{verificationCode}",
//         verificationToken
//       ),
//     });

//     console.log("Verification email sent:", info.messageId);
//   } catch (error) {
//     console.error("Failed to send verification email", error);
//     throw new Error(`Verification email error: ${error}`);
//   }
// };

// export const sendWelcomeEmail = async (email, name) => {
//   try {
//     const html = WELCOME_EMAIL_TEMPLATE.replace("{userName}", name);

//     const info = await transporter.sendMail({
//       from: senderEmail,
//       to: email,
//       subject: "Welcome!",
//       html,
//     });

//     console.log("Welcome email sent:", info.messageId);
//   } catch (error) {
//     throw new Error(`Welcome email error: ${error}`);
//   }
// };

// export const sendPasswordResetEmail = async (email, resetURL) => {
//   try {
//     const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
//       "{resetURL}",
//       resetURL
//     );

//     const info = await transporter.sendMail({
//       from: senderEmail,
//       to: email,
//       subject: "Reset Your Password",
//       html,
//     });

//     console.log("Password reset email sent:", info.messageId);
//   } catch (error) {
//     throw new Error(`Password reset email error: ${error}`);
//   }
// };

// export const sendResetSuccessEmail = async (email) => {
//   try {
//     const info = await transporter.sendMail({
//       from: senderEmail,
//       to: email,
//       subject: "Password Reset Successful",
//       html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//     });

//     console.log("Password reset success email sent:", info.messageId);
//   } catch (error) {
//     throw new Error(`Reset success email error: ${error}`);
//   }
// };



import sgMail from "./sendgrid.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

const senderEmail = "bolarinwadavid3@gmail.com"; // must be verified in SendGrid

export const sendVerificationEmail = async (email, name, verificationToken) => {
  try {
    const msg = {
      to: email,
      from: {
        email: senderEmail,
        name: "Bolarinwa David",
      },
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{userName}", name).replace(
        "{verificationCode}",
        verificationToken
      ),
    };

    await sgMail.send(msg);
    console.log("✅ Verification email sent");
  } catch (error) {
    console.error(
      "❌ Failed to send verification email",
      error.response?.body || error
    );
    throw new Error("Verification email error");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const msg = {
      to: email,
      from: {
        email: senderEmail,
        name: "Bolarinwa David",
      },
      subject: "Welcome!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name),
    };

    await sgMail.send(msg);
    console.log("✅ Welcome email sent");
  } catch (error) {
    console.error("❌ Welcome email error", error.response?.body || error);
    throw new Error("Welcome email error");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const msg = {
      to: email,
      from: {
        email: senderEmail,
        name: "Bolarinwa David",
      },
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };

    await sgMail.send(msg);
    console.log("✅ Password reset email sent");
  } catch (error) {
    console.error(
      "❌ Password reset email error",
      error.response?.body || error
    );
    throw new Error("Password reset email error");
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const msg = {
      to: email,
      from: {
        email: senderEmail,
        name: "Bolarinwa David",
      },
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    await sgMail.send(msg);
    console.log("✅ Reset success email sent");
  } catch (error) {
    console.error(
      "❌ Reset success email error",
      error.response?.body || error
    );
    throw new Error("Reset success email error");
  }
};
