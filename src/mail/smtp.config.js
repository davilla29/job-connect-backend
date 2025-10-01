import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SENDGRID_API_HOST,
  port: process.env.SENDGRID_API_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SENDGRID_API_USER,
    pass: process.env.SENDGRID_API_KEY,
  },
});

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take messages");
//   }
// });

// console.log("SMTP_HOST:", process.env.SMTP_HOST);
// console.log("SMTP_PORT:", process.env.SMTP_PORT);
