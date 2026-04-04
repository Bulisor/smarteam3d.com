import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ info: 'error', msg: 'Method not allowed' });
  }

  const { name, mail, comment, subject } = req.body;

  if (!name) {
    return res.status(400).json({ info: 'error', msg: 'Please enter your name.' });
  }
  if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    return res.status(400).json({ info: 'error', msg: 'Please enter valid e-mail.' });
  }
  if (!comment) {
    return res.status(400).json({ info: 'error', msg: 'Please enter your message.' });
  }
  if (!subject) {
    return res.status(400).json({ info: 'error', msg: 'Please fill subject field.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"SmarTeam3D" <contact@smarteam3d.com>',
      to: 'contact@smarteam3d.com',
      replyTo: `"${name}" <${mail}>`,
      subject: subject,
      text: comment,
    });
    return res.status(200).json({ info: 'success', msg: 'Your message has been sent. Thank you!' });
  } catch (err) {
    return res.status(500).json({ info: 'error', msg: err.message });
  }
}
