import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

export const mailToAdmin = async (name, email, message) => {
  return transporter.sendMail({
    from: email,
    to: senderEmail,
    subject: `New Contact Form Submission from ${name}`,
    text: message,
  });
};

export const mailToUser = async (name, email) => {
  return transporter.sendMail({
    from: senderEmail,
    to: email,
    subject: "We Received Your Query",
    text: `Hello ${name},\n\nThank you for contacting us. Our team will reach out to you within 3 working days.\n\nBest Regards,\n TrippyGo`,
  });
};
