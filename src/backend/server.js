const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection - USE YOUR DATABASE CREDENTIALS
const pool = new Pool({
  host: 'localhost',
  port: 5433,
  database: 'hospital_management',
  user: 'postgres',
  password: 'your_password'
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // TODO: Implement proper password hashing (bcrypt)
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1 AND password_hash = $2',
    [email, password] // In production, hash the password
  );

  if (result.rows.length > 0) {
    const user = result.rows[0];
    res.json({
      token: 'fake-jwt-token-for-now',
      user: {
        id: user.user_id,
        email: user.email,
        role: user.role,
        username: user.username
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));