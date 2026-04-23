import nodemailer from 'nodemailer';

// Create the transporter once — reused for every email
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
    console.log(`[Mailer] Email sent → ${to} | "${subject}"`);
  } catch (err) {
    // Log but don't crash — a failed email should never break the consumer
    console.error(`[Mailer] Failed to send email to ${to}:`, err.message);
  }
};

export default sendEmail;