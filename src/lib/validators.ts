// Form Validation Utilities

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Indian phone number
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove spaces, dashes, and +91 prefix
  const cleaned = phone.replace(/[\s\-+]/g, '').replace(/^91/, '');
  // Should be 10 digits starting with 6-9
  return /^[6-9]\d{9}$/.test(cleaned);
};

/**
 * Validate PAN number
 */
export const isValidPAN = (pan: string): boolean => {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase());
};

/**
 * Validate Aadhaar number (12 digits)
 */
export const isValidAadhaar = (aadhaar: string): boolean => {
  const cleaned = aadhaar.replace(/\s/g, '');
  return /^\d{12}$/.test(cleaned);
};

/**
 * Validate pincode (6 digits)
 */
export const isValidPincode = (pincode: string): boolean => {
  return /^\d{6}$/.test(pincode);
};

/**
 * Validate required field
 */
export const isRequired = (value: string | number | boolean | null | undefined): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'boolean') return value;
  return true;
};

/**
 * Validate minimum length
 */
export const minLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

/**
 * Validate maximum length
 */
export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

/**
 * Validate minimum value for numbers
 */
export const minValue = (value: number, min: number): boolean => {
  return value >= min;
};

/**
 * Validate maximum value for numbers
 */
export const maxValue = (value: number, max: number): boolean => {
  return value <= max;
};

/**
 * Validate loan amount (min 50000, max 10 crore)
 */
export const isValidLoanAmount = (amount: number): boolean => {
  return amount >= 50000 && amount <= 100000000;
};

/**
 * Validate monthly income (min 15000)
 */
export const isValidMonthlyIncome = (income: number): boolean => {
  return income >= 15000;
};

/**
 * Format phone number for display
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '').replace(/^91/, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

/**
 * Format Aadhaar for display (XXXX XXXX XXXX)
 */
export const formatAadhaar = (aadhaar: string): string => {
  const cleaned = aadhaar.replace(/\D/g, '');
  return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

/**
 * Format currency (INR)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Validate lead form data
 */
export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  loanType: string;
  amount?: number;
}

export const validateLeadForm = (data: LeadFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!isRequired(data.fullName)) {
    errors.fullName = 'Full name is required';
  } else if (!minLength(data.fullName, 3)) {
    errors.fullName = 'Name must be at least 3 characters';
  }

  if (!isRequired(data.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number';
  }

  if (!isRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!isRequired(data.loanType)) {
    errors.loanType = 'Please select a loan type';
  }

  if (data.amount !== undefined && data.amount > 0 && !isValidLoanAmount(data.amount)) {
    errors.amount = 'Loan amount must be between ₹50,000 and ₹10 Crore';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
