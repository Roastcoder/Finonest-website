import express from 'express';
import { db } from '../services/database.js';
import { validate } from '../middleware/index.js';
import { schemas } from '../utils/validation.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Submit loan application
router.post('/', validate(schemas.loanApplication), async (req, res, next) => {
  try {
    const {
      fullName, email, phone, loanType, loanAmount,
      monthlyIncome, employmentType, city, pincode
    } = req.body;
    
    const result = await db.query(`
      INSERT INTO loan_applications 
      (full_name, email, phone, loan_type, loan_amount, monthly_income, employment_type, city, pincode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [fullName, email, phone, loanType, loanAmount, monthlyIncome, employmentType, city, pincode]);
    
    logger.info('Loan application submitted', { 
      applicationId: result.insertId, 
      email, 
      loanType, 
      loanAmount 
    });
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        applicationId: result.insertId,
        status: 'pending'
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;