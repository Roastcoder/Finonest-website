import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'finonest-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const dbConfig = {
  host: process.env.DB_HOST || 'vgc0o0gkw0cgwo0os0g0ksg0',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'Finonest@admin@root',
  database: process.env.DB_NAME || 'Fino'
};

let connection;

// Connect to MySQL
const connectDB = async () => {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('MySQL connected successfully');
    await initializeTables();
  } catch (error) {
    console.error('MySQL connection failed:', error);
    process.exit(1);
  }
};

// Initialize database tables
const initializeTables = async () => {
  try {
    // Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Loan applications table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS loan_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        loan_type VARCHAR(100) NOT NULL,
        loan_amount DECIMAL(15,2) NOT NULL,
        monthly_income DECIMAL(15,2),
        employment_type VARCHAR(100),
        city VARCHAR(100),
        pincode VARCHAR(10),
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact messages table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL,
        status ENUM('new', 'read', 'replied') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Content blocks table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS content_blocks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`key\` VARCHAR(255) UNIQUE NOT NULL,
        content JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Theme settings table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS theme_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(255) UNIQUE NOT NULL,
        setting_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create default admin user
    const adminEmail = 'admin@finonest.com';
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    await connection.execute(`
      INSERT IGNORE INTO users (email, password, full_name, role) 
      VALUES (?, ?, 'Admin User', 'admin')
    `, [adminEmail, adminPassword]);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend API is running' });
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    
    // Check if user exists
    const [existing] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const [result] = await connection.execute(
      'INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)',
      [email, hashedPassword, fullName]
    );
    
    // Generate token
    const token = jwt.sign(
      { id: result.insertId, email, role: 'user' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: result.insertId, email, fullName, role: 'user' } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.full_name, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Loan application routes
app.post('/api/applications', async (req, res) => {
  try {
    const {
      fullName, email, phone, loanType, loanAmount,
      monthlyIncome, employmentType, city, pincode
    } = req.body;
    
    const [result] = await connection.execute(`
      INSERT INTO loan_applications 
      (full_name, email, phone, loan_type, loan_amount, monthly_income, employment_type, city, pincode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [fullName, email, phone, loanType, loanAmount, monthlyIncome, employmentType, city, pincode]);
    
    res.json({ success: true, applicationId: result.insertId });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Contact form route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const [result] = await connection.execute(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );
    
    res.json({ success: true, messageId: result.insertId });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Admin routes
app.get('/api/admin/applications', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [applications] = await connection.execute(`
      SELECT * FROM loan_applications 
      ORDER BY created_at DESC
    `);
    res.json(applications);
  } catch (error) {
    console.error('Admin applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

app.get('/api/admin/contacts', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [contacts] = await connection.execute(`
      SELECT * FROM contact_messages 
      ORDER BY created_at DESC
    `);
    res.json(contacts);
  } catch (error) {
    console.error('Admin contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.put('/api/admin/applications/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await connection.execute(
      'UPDATE loan_applications SET status = ? WHERE id = ?',
      [status, id]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Content management routes
app.get('/api/content/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const [rows] = await connection.execute(
      'SELECT content FROM content_blocks WHERE `key` = ?',
      [key]
    );
    res.json(rows.length > 0 ? rows[0].content : null);
  } catch (error) {
    console.error('Content query error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/theme', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM theme_settings');
    const theme = {};
    rows.forEach(row => {
      theme[row.setting_key] = row.setting_value;
    });
    res.json(theme);
  } catch (error) {
    console.error('Theme query error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT 1 as test');
    res.json({ success: true, message: 'Database connection working', data: rows });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend API running on port ${PORT}`);
    console.log('Default admin login: admin@finonest.com / admin123');
  });
};

startServer().catch(console.error);