import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { name, mail, comment, subject } = await req.json()

  if (!name) {
    return NextResponse.json({ info: 'error', msg: 'Please enter your name.' }, { status: 400 })
  }
  if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    return NextResponse.json({ info: 'error', msg: 'Please enter valid e-mail.' }, { status: 400 })
  }
  if (!comment) {
    return NextResponse.json({ info: 'error', msg: 'Please enter your message.' }, { status: 400 })
  }
  if (!subject) {
    return NextResponse.json({ info: 'error', msg: 'Please fill subject field.' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: '"SmarTeam3D" <contact@smarteam3d.com>',
      to: 'contact@smarteam3d.com',
      replyTo: `"${name}" <${mail}>`,
      subject: `[SmarTeam3D] ${subject}`,
      text: `Name: ${name}\nEmail: ${mail}\nSubject: ${subject}\n\n${comment}`,
      html: `
        <table style="font-family:sans-serif;font-size:14px;color:#333;max-width:600px">
          <tr><td style="padding:4px 0"><strong>Name:</strong> ${name}</td></tr>
          <tr><td style="padding:4px 0"><strong>Email:</strong> <a href="mailto:${mail}">${mail}</a></td></tr>
          <tr><td style="padding:4px 0"><strong>Subject:</strong> ${subject}</td></tr>
          <tr><td style="padding:16px 0 4px"><strong>Message:</strong></td></tr>
          <tr><td style="padding:8px;background:#f5f5f5;border-left:3px solid #9e0707;white-space:pre-wrap">${comment}</td></tr>
        </table>
      `,
    })
    return NextResponse.json({ info: 'success', msg: 'Your message has been sent. Thank you!' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ info: 'error', msg: message }, { status: 500 })
  }
}
