import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kapoorashish714@gmail.com",
    pass: "ktaq ntcm dgkq qcvv", //  use app password
  },
});

export async function sendMail({ to, subject, html }) {
  return await transporter.sendMail({
    from: "AI Agent kapoorashish714@gmail.com>",
    to,
    subject,
    html,
  });
}