#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';

console.log('🧹 Cleaning gh-pages branch for fresh deployment...');

try {
  // Remove gh-pages branch if it exists
  try {
    execSync('git branch -D gh-pages', { stdio: 'ignore' });
    console.log('✅ Removed local gh-pages branch');
  } catch (error) {
    console.log('ℹ️  No local gh-pages branch to remove');
  }

  // Remove remote gh-pages branch
  try {
    execSync('git push origin --delete gh-pages', { stdio: 'ignore' });
    console.log('✅ Removed remote gh-pages branch');
  } catch (error) {
    console.log('ℹ️  No remote gh-pages branch to remove');
  }

  // Build the project
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Deploy to gh-pages
  console.log('🚀 Deploying to GitHub Pages...');
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });

  console.log('✅ Deployment completed successfully!');
  console.log('🌐 Your site should be available at: https://pargat-apps.github.io/portfolio/');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
