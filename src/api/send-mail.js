// api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Create a transporter using SMTP (use your SMTP server details)
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // True for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Use environment variable for security
        pass: process.env.SMTP_PASS, // Use environment variable for security
      },
    });

    const mailOptions = {
      from: email, // Sender address
      to: "histeelalloys@gmail.com", // Recipient address
      subject: `Message from ${name} - ${email}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" }); // Only allow POST requests
  }
}
