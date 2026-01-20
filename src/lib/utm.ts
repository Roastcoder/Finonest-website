// UTM Parameter Utilities
// Capture and persist UTM parameters for lead tracking

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
}

const UTM_STORAGE_KEY = 'finonest_utm_params';

/**
 * Capture UTM parameters from current URL
 */
export const captureUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};
  
  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content'
  ];
  
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });
  
  // Also capture document referrer if no utm_source
  if (!utmParams.utm_source && document.referrer) {
    utmParams.referrer = document.referrer;
  }
  
  return utmParams;
};

/**
 * Store UTM parameters in session storage
 */
export const storeUTMParams = (params: UTMParams): void => {
  if (typeof window === 'undefined') return;
  
  const existingParams = getStoredUTMParams();
  // Only store if we don't already have params (first touch attribution)
  if (Object.keys(existingParams).length === 0 && Object.keys(params).length > 0) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
  }
};

/**
 * Get stored UTM parameters
 */
export const getStoredUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

/**
 * Clear stored UTM parameters
 */
export const clearUTMParams = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(UTM_STORAGE_KEY);
};

/**
 * Get all UTM params (current + stored)
 */
export const getAllUTMParams = (): UTMParams => {
  const current = captureUTMParams();
  const stored = getStoredUTMParams();
  return { ...stored, ...current };
};
