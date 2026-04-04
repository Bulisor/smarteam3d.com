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
      subject,
      text: comment,
    })
    return NextResponse.json({ info: 'success', msg: 'Your message has been sent. Thank you!' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ info: 'error', msg: message }, { status: 500 })
  }
}
