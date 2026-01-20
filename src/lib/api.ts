// API Utilities for form submissions
import { supabase } from "@/integrations/supabase/client";
import { getAllUTMParams } from "./utm";

export interface LeadSubmission {
  fullName: string;
  phone: string;
  email: string;
  loanType: string;
  amount?: number;
  employmentType?: string;
  monthlyIncome?: number;
  notes?: string;
  source?: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Submit a loan application
 */
export const submitLoanApplication = async (
  userId: string,
  data: LeadSubmission
): Promise<APIResponse<{ id: string }>> => {
  try {
    const utmParams = getAllUTMParams();
    
    const { data: result, error } = await supabase
      .from('loan_applications')
      .insert({
        user_id: userId,
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        loan_type: data.loanType,
        amount: data.amount || 0,
        employment_type: data.employmentType || null,
        monthly_income: data.monthlyIncome || null,
        notes: data.notes ? `${data.notes}\n\nUTM: ${JSON.stringify(utmParams)}` : JSON.stringify(utmParams),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Loan application error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: { id: result.id } };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

/**
 * Check application status by phone number
 */
export const checkApplicationStatus = async (
  phone: string
): Promise<APIResponse<Array<{
  id: string;
  loan_type: string;
  amount: number;
  status: string;
  created_at: string;
}>>> => {
  try {
    const { data, error } = await supabase
      .from('loan_applications')
      .select('id, loan_type, amount, status, created_at')
      .eq('phone', phone)
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (err) {
    console.error('Status check error:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

/**
 * Submit referral
 */
export interface ReferralData {
  referrerName: string;
  referrerPhone: string;
  referrerEmail: string;
  refereeName: string;
  refereePhone: string;
  refereeEmail: string;
  loanType: string;
}

export const submitReferral = async (data: ReferralData): Promise<APIResponse> => {
  // For now, we'll log this - in production this would go to a referrals table
  console.log('Referral submitted:', data);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

/**
 * Upload KYC documents
 */
export const uploadKYCDocument = async (
  userId: string,
  documentType: string,
  file: File
): Promise<APIResponse<{ path: string }>> => {
  try {
    const fileName = `${userId}/${documentType}_${Date.now()}_${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('kyc-documents')
      .upload(fileName, file);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: { path: data.path } };
  } catch (err) {
    console.error('Upload error:', err);
    return { success: false, error: 'Failed to upload document' };
  }
};
