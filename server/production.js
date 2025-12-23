import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'finonest-production-secret';

// Database pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'vgc0o0gkw0cgwo0os0g0ksg0',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'Finonest@admin@root',
  database: process.env.DB_NAME || 'Fino',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'https://finonest.org'],
  credentials: true
}));

// Rate limiting
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests' }
}));

app.use(express.json({ limit: '10mb' }));

// Validation schemas
const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().min(2).max(100).required()
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  loanApplication: Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    loanType: Joi.string().valid('home', 'personal', 'business', 'car').required(),
    loanAmount: Joi.number().min(10000).max(10000000).required(),
    monthlyIncome: Joi.number().min(0).optional(),
    employmentType: Joi.string().max(100).optional(),
    city: Joi.string().max(100).optional(),
    pincode: Joi.string().pattern(/^[0-9]{6}$/).optional()
  }),
  contact: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    message: Joi.string().min(10).max(1000).required()
  })
};

// Validation middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(d => d.message)
    });
  }
  next();
};

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token required' });
  }
  
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin required' });
  }
  next();
};

// Database query helper
const query = async (sql, params = []) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

// Initialize database
const initDB = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS loan_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        loan_type ENUM('home', 'personal', 'business', 'car') NOT NULL,
        loan_amount DECIMAL(15,2) NOT NULL,
        monthly_income DECIMAL(15,2),
        employment_type VARCHAR(100),
        city VARCHAR(100),
        pincode VARCHAR(10),
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
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

    // Create admin user
    const adminExists = await query('SELECT id FROM users WHERE email = ?', ['admin@finonest.com']);
    if (adminExists.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await query(
        'INSERT INTO users (email, password, full_name, role) VALUES (?, ?, ?, ?)',
        ['admin@finonest.com', hashedPassword, 'Admin User', 'admin']
      );
    }

    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};

// Routes
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Finonest API is healthy',
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.post('/api/v1/auth/register', validate(schemas.register), async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    
    const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await query(
      'INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)',
      [email, hashedPassword, fullName]
    );
    
    const token = jwt.sign(
      { id: result.insertId, email, role: 'user' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { token, user: { id: result.insertId, email, fullName, role: 'user' } }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

app.post('/api/v1/auth/login', validate(schemas.login), async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Application routes
app.post('/api/v1/applications', validate(schemas.loanApplication), async (req, res) => {
  try {
    const { fullName, email, phone, loanType, loanAmount, monthlyIncome, employmentType, city, pincode } = req.body;
    
    const result = await query(`
      INSERT INTO loan_applications 
      (full_name, email, phone, loan_type, loan_amount, monthly_income, employment_type, city, pincode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [fullName, email, phone, loanType, loanAmount, monthlyIncome, employmentType, city, pincode]);
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { applicationId: result.insertId }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Application submission failed' });
  }
});

// Contact routes
app.post('/api/v1/contact', validate(schemas.contact), async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const result = await query(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: { messageId: result.insertId }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// Admin routes
app.get('/api/v1/admin/applications', authenticate, requireAdmin, async (req, res) => {
  try {
    const applications = await query('SELECT * FROM loan_applications ORDER BY created_at DESC');
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
});

app.get('/api/v1/admin/contacts', authenticate, requireAdmin, async (req, res) => {
  try {
    const contacts = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
});

app.put('/api/v1/admin/applications/:id/status', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    await query('UPDATE loan_applications SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

app.get('/api/v1/admin/stats', authenticate, requireAdmin, async (req, res) => {
  try {
    const [appStats] = await query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
      FROM loan_applications
    `);
    
    const [contactStats] = await query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_messages
      FROM contact_messages
    `);
    
    res.json({
      success: true,
      data: { applications: appStats, contacts: contactStats }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

// Legacy routes (backward compatibility)
app.use('/api/auth', (req, res, next) => { req.url = req.url.replace('/api/auth', '/api/v1/auth'); next(); });
app.use('/api/applications', (req, res, next) => { req.url = req.url.replace('/api/applications', '/api/v1/applications'); next(); });
app.use('/api/contact', (req, res, next) => { req.url = req.url.replace('/api/contact', '/api/v1/contact'); next(); });
app.use('/api/admin', (req, res, next) => { req.url = req.url.replace('/api/admin', '/api/v1/admin'); next(); });

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
const startServer = async () => {
  await initDB();
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Finonest API running on port ${PORT}`);
    console.log(`🔐 Admin login: admin@finonest.com / admin123`);
    console.log(`🛡️ Security: Helmet + Rate Limiting + CORS`);
    console.log(`📊 Database: MySQL with connection pooling`);
  });
  
  return server;
};

const server = await startServer();