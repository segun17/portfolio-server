const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log('Nodemailer config:', {
  user: process.env.EMAIL_USER,
  // pass: process.env.EMAIL_PASS ? '[REDACTED]' : undefined,
});

module.exports = transporter;