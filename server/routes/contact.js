import express from 'express';
import { db } from '../services/database.js';
import { validate } from '../middleware/index.js';
import { schemas } from '../utils/validation.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Submit contact message
router.post('/', validate(schemas.contact), async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const result = await db.query(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );
    
    logger.info('Contact message submitted', { 
      messageId: result.insertId, 
      email, 
      name 
    });
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        messageId: result.insertId
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;