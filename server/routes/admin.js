import express from 'express';
import { db } from '../services/database.js';
import { authenticate, requireAdmin, validate } from '../middleware/index.js';
import { schemas } from '../utils/validation.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authenticate);
router.use(requireAdmin);

// Get all loan applications
router.get('/applications', async (req, res, next) => {
  try {
    const { page = 1, limit = 50, status } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM loan_applications';
    const params = [];
    
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const applications = await db.query(query, params);
    
    res.json({
      success: true,
      data: { applications }
    });
  } catch (error) {
    next(error);
  }
});

// Get all contact messages
router.get('/contacts', async (req, res, next) => {
  try {
    const { page = 1, limit = 50, status } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM contact_messages';
    const params = [];
    
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const contacts = await db.query(query, params);
    
    res.json({
      success: true,
      data: { contacts }
    });
  } catch (error) {
    next(error);
  }
});

// Update application status
router.put('/applications/:id/status', 
  validate(schemas.updateStatus),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const result = await db.query(
        'UPDATE loan_applications SET status = ? WHERE id = ?',
        [status, id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Application not found'
        });
      }
      
      logger.info('Application status updated', { 
        applicationId: id, 
        status, 
        adminId: req.user.id 
      });
      
      res.json({
        success: true,
        message: 'Application status updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get dashboard statistics
router.get('/stats', async (req, res, next) => {
  try {
    const [appStats] = await db.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
      FROM loan_applications
    `);
    
    const [contactStats] = await db.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_messages
      FROM contact_messages
    `);
    
    res.json({
      success: true,
      data: {
        applications: appStats,
        contacts: contactStats
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;