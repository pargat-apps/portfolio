#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const DIST_DIR = 'dist'
const INDEX_PATH = path.join(DIST_DIR, 'index.html')

// Production CSP - Strict security policy
const PRODUCTION_CSP = `
      default-src 'self';
      script-src 'self';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https: blob:;
      connect-src 'self' 
        https://api.github.com 
        https://raw.githubusercontent.com
        https://leetcode-stats-api.herokuapp.com 
        https://alfa-leetcode-api.onrender.com 
        https://leetcode-api-faisalshohag.vercel.app;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.trim()

async function updateCSPForProduction() {
  try {
    // Check if dist directory exists
    if (!fs.existsSync(DIST_DIR)) {
      console.log('❌ dist directory not found. Run "npm run build" first.')
      process.exit(1)
    }

    // Read the built index.html
    let html = fs.readFileSync(INDEX_PATH, 'utf8')

    // Replace development CSP with production CSP
    const cspRegex = /(<meta http-equiv="Content-Security-Policy" content=")([\s\S]*?)(">)/g
    
    html = html.replace(cspRegex, (match, opening, content, closing) => {
      return `${opening}${PRODUCTION_CSP}${closing}`
    })

    // Update comment
    html = html.replace(
      '<!-- Content Security Policy - Development Mode -->',
      '<!-- Content Security Policy - Production Mode -->'
    )

    // Write the updated HTML
    fs.writeFileSync(INDEX_PATH, html)

    console.log('✅ Production CSP applied to dist/index.html')
    console.log('🔒 Security policy updated for production deployment')
  } catch (error) {
    console.error('❌ Error updating CSP:', error.message)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateCSPForProduction()
}

export { updateCSPForProduction }
