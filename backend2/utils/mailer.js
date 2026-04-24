import nodemailer from "nodemailer";

export const sendAccountCreatedEmail = async (toEmail, name) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,   // your email
      pass: process.env.SMTP_PASS    // app password
    }
  });

  const mailOptions = {
    from: `"EduMart" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Welcome to EduMart 🎉",
    html: `
      <h2>Hello ${name},</h2>
      <p>Your account has been successfully created on <b>EduMart</b>.</p>
      <p>You can now log in and start learning.</p>
      <br/>
      <p>Regards,<br/>EduMart Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
};
