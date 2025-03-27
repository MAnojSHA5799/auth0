// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const nodemailer = require("nodemailer");
// const axios = require("axios");

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
// const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
// const SMTP_EMAIL = process.env.SMTP_EMAIL;
// const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
// const SMTP_HOST = process.env.SMTP_HOST;

// // 📌 Nodemailer Config
// const transporter = nodemailer.createTransport({
//   host: SMTP_HOST,
//   port: 587,
//   secure: false,
//   auth: {
//     user: SMTP_EMAIL,
//     pass: SMTP_PASSWORD,
//   },
// });

// // 📌 Verify Auth0 Token & Send Email
// app.post("/auth/callback", async (req, res) => {
//     const { token, email } = req.body;
//   console.log(req.body)
//     if (!token || !email) {
//       return res.status(400).json({ error: "Token and email are required" });
//     }
  
//     try {
//       // ✅ Send Email with Token
//       const mailOptions = {
//         from: `"Auth0 System" <${SMTP_EMAIL}>`,
//         to: email,
//         subject: "🔐 Your Auth0 Authentication Token",
//         text: `Hello,\n\nYour authentication token is:\n\n${token}\n\nThank you for using our service!`,
//       };
  
//       await transporter.sendMail(mailOptions);
  
//       console.log(`✅ Email sent successfully to ${email}`);
//       res.json({ message: `Email sent to ${email}` });
//     } catch (error) {
//       console.error("❌ Error sending email:", error.message);
//       res.status(500).json({ error: "Failed to send email", details: error.message });
//     }
//   });
  

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
const NODE_PASSWORD = process.env.NODE_PASSWORD;
const NODE_USER = process.env.NODE_USER;


// 📌 Nodemailer Configuration (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODE_USER,
    pass: NODE_PASSWORD, // ⚠️ Use an App Password, not your main password
  },
});

// ✅ Verify SMTP Connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ Gmail SMTP Server is ready to send emails");
  }
});

// 📌 Verify Auth0 Token & Send Email
app.post("/auth/callback", async (req, res) => {
  const { token, email, name } = req.body;
  console.log("📩 Incoming Request:", req.body);

  if (!token || !email || !name) {
    return res.status(400).json({ error: "Token and email are required" });
  }

  try {
    // ✅ Send Email
    const info = await transporter.sendMail({
      from: '"Auth0 System" <blitzlearningtechnologies@gmail.com>',
      to: email,
      subject: "🔐 Your Auth0 Authentication Token",
      text: `Hello ${name},\n\nYour authentication token is:\n\n${token}\n\nThank you for using our service!`,
    });

    console.log(`✅ Email sent successfully to ${email}: ${info.response}`);
    res.json({ message: `Email sent to ${email}` });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
