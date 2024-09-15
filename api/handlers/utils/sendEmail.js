import { createTransport } from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  export function sendVerificationEmail (email, token) {
    const url = `http://localhost:3000/verify/${token}`;
    transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `Click <a href="${url}">here</a> to verify your email.`,
    })
  }