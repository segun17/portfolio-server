const resend = require('../utils/resendClient');

exports.sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.EMAIL_USER,
      subject: `Portfolio message from ${name}`,
      html: `
        <div>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
