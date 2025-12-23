import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../services/database.js';
import { config } from '../config/index.js';
import { validate } from '../middleware/index.js';
import { schemas } from '../utils/validation.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Register
router.post('/register', validate(schemas.register), async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    
    const existing = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email',
        code: 'USER_EXISTS'
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.query(
      'INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)',
      [email, hashedPassword, fullName]
    );
    
    const token = jwt.sign(
      { id: result.insertId, email, role: 'user' },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    logger.info('User registered', { userId: result.insertId, email });
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        token,
        user: { id: result.insertId, email, fullName, role: 'user' }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', validate(schemas.login), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    logger.info('User logged in', { userId: user.id, email: user.email });
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;