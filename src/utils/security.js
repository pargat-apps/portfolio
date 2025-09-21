// Security utilities for CSP compliance and general security

/**
 * Generate a cryptographically secure nonce for CSP
 * @returns {string} A secure nonce string
 */
export const generateNonce = () => {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode.apply(null, array))
}

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - The sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Validate external URLs before making requests
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is safe
 */
export const isValidExternalUrl = (url) => {
  try {
    const urlObj = new URL(url)
    
    // Allow only HTTPS for external URLs
    if (urlObj.protocol !== 'https:') return false
    
    // Whitelist of allowed domains
    const allowedDomains = [
      'api.github.com',
      'raw.githubusercontent.com',
      'leetcode-stats-api.herokuapp.com',
      'alfa-leetcode-api.onrender.com',
      'leetcode-api-faisalshohag.vercel.app',
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ]
    
    return allowedDomains.includes(urlObj.hostname)
  } catch {
    return false
  }
}

/**
 * Secure fetch wrapper with URL validation
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @returns {Promise} - Fetch promise
 */
export const secureFetch = async (url, options = {}) => {
  if (!isValidExternalUrl(url)) {
    throw new Error(`Blocked request to untrusted domain: ${url}`)
  }
  
  const defaultOptions = {
    mode: 'cors',
    credentials: 'omit',
    referrerPolicy: 'strict-origin-when-cross-origin',
    ...options
  }
  
  return fetch(url, defaultOptions)
}

/**
 * Content Security Policy configuration
 * Development allows 'unsafe-eval' for HMR, React DevTools, and Tailwind CSS processing
 * Production uses strict policy without 'unsafe-eval' for maximum security
 */
export const CSP_CONFIG = {
  development: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow eval for dev tools
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'img-src': ["'self'", "data:", "https:", "blob:"],
    'connect-src': [
      "'self'",
      "ws://localhost:*", // WebSocket for HMR
      "http://localhost:*", // Local development
      "https://api.github.com",
      "https://raw.githubusercontent.com",
      "https://leetcode-stats-api.herokuapp.com",
      "https://alfa-leetcode-api.onrender.com",
      "https://leetcode-api-faisalshohag.vercel.app"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"]
  },
  production: {
    'default-src': ["'self'"],
    'script-src': ["'self'"], // Strict - no unsafe-eval in production
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'img-src': ["'self'", "data:", "https:", "blob:"],
    'connect-src': [
      "'self'",
      "https://api.github.com",
      "https://raw.githubusercontent.com",
      "https://leetcode-stats-api.herokuapp.com",
      "https://alfa-leetcode-api.onrender.com",
      "https://leetcode-api-faisalshohag.vercel.app"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'block-all-mixed-content': true,
    'upgrade-insecure-requests': true
  }
}

/**
 * Get the appropriate CSP based on environment
 * @returns {object} CSP configuration for current environment
 */
export const getCurrentCSP = () => {
  const isProduction = process.env.NODE_ENV === 'production'
  return CSP_CONFIG[isProduction ? 'production' : 'development']
}

/**
 * Security best practices documentation
 */
export const SECURITY_NOTES = {
  development: [
    "⚠️  Development mode allows 'unsafe-eval' for:",
    "   • Vite Hot Module Replacement (HMR)",
    "   • React DevTools debugging",
    "   • Tailwind CSS processing",
    "   • Source map generation",
    "✅  This is safe for development but removed in production"
  ],
  production: [
    "🔒 Production mode enforces strict CSP:",
    "   • No 'unsafe-eval' allowed",
    "   • Scripts must be from same origin only",
    "   • HTTPS enforced for all external resources",
    "   • Mixed content blocked",
    "🛡️  Maximum security for deployed application"
  ]
}
