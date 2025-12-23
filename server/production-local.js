import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'finonest-production-secret';

// SQLite database
let db;

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

// Initialize database
const initDB = async () => {
  try {
    db = await open({
      filename: path.join(__dirname, 'finonest.db'),
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS loan_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        loan_type TEXT NOT NULL CHECK(loan_type IN ('home', 'personal', 'business', 'car')),
        loan_amount REAL NOT NULL,
        monthly_income REAL,
        employment_type TEXT,
        city TEXT,
        pincode TEXT,
        status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'new' CHECK(status IN ('new', 'read', 'replied')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create admin user
    const adminExists = await db.get('SELECT id FROM users WHERE email = ?', ['admin@finonest.com']);
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await db.run(
        'INSERT INTO users (email, password, full_name, role) VALUES (?, ?, ?, ?)',
        ['admin@finonest.com', hashedPassword, 'Admin User', 'admin']
      );
    }

    console.log('✅ SQLite database initialized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};

// Routes
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Finonest API is healthy (SQLite)',
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.post('/api/v1/auth/register', validate(schemas.register), async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    
    const existing = await db.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.run(
      'INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)',
      [email, hashedPassword, fullName]
    );
    
    const token = jwt.sign(
      { id: result.lastID, email, role: 'user' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { token, user: { id: result.lastID, email, fullName, role: 'user' } }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

app.post('/api/v1/auth/login', validate(schemas.login), async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
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
    
    const result = await db.run(`
      INSERT INTO loan_applications 
      (full_name, email, phone, loan_type, loan_amount, monthly_income, employment_type, city, pincode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [fullName, email, phone, loanType, loanAmount, monthlyIncome, employmentType, city, pincode]);
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { applicationId: result.lastID }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Application submission failed' });
  }
});

// Contact routes
app.post('/api/v1/contact', validate(schemas.contact), async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const result = await db.run(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: { messageId: result.lastID }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// Admin routes
app.get('/api/v1/admin/applications', authenticate, requireAdmin, async (req, res) => {
  try {
    const applications = await db.all('SELECT * FROM loan_applications ORDER BY created_at DESC');
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
});

app.get('/api/v1/admin/contacts', authenticate, requireAdmin, async (req, res) => {
  try {
    const contacts = await db.all('SELECT * FROM contact_messages ORDER BY created_at DESC');
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
    
    await db.run('UPDATE loan_applications SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

app.get('/api/v1/admin/stats', authenticate, requireAdmin, async (req, res) => {
  try {
    const appStats = await db.get(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
      FROM loan_applications
    `);
    
    const contactStats = await db.get(`
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

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.close(async () => {
    if (db) await db.close();
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
const startServer = async () => {
  await initDB();
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Finonest API running on port ${PORT} (SQLite)`);
    console.log(`🔐 Admin login: admin@finonest.com / admin123`);
    console.log(`🛡️ Security: Helmet + Rate Limiting + CORS`);
    console.log(`📊 Database: SQLite (local file)`);
  });
  
  return server;
};

const server = await startServer();