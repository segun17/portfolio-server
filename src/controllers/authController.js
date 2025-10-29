const jwt = require('jsonwebtoken');

const ADMIN_CREDENTIALS = {
  // email: 'segunoladokun47@gmail.com',
  // password: 'Segun*2007',
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
};