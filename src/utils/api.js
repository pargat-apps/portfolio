import { secureFetch } from './security.js'

// CSP-compliant base64 decoder
const decodeBase64 = (base64String) => {
  try {
    // Use the native atob but wrap it safely for CSP compliance
    return atob(base64String)
  } catch (error) {
    // Fallback for strict CSP environments
    // This is a simple base64 decoder implementation
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    let result = ''
    let i = 0
    
    base64String = base64String.replace(/[^A-Za-z0-9+/]/g, '')
    
    while (i < base64String.length) {
      const a = chars.indexOf(base64String.charAt(i++))
      const b = chars.indexOf(base64String.charAt(i++))
      const c = chars.indexOf(base64String.charAt(i++))
      const d = chars.indexOf(base64String.charAt(i++))
      
      const bitmap = (a << 18) | (b << 12) | (c << 6) | d
      const char1 = (bitmap >> 16) & 255
      const char2 = (bitmap >> 8) & 255
      const char3 = bitmap & 255
      
      result += String.fromCharCode(char1)
      if (c !== 64) result += String.fromCharCode(char2)
      if (d !== 64) result += String.fromCharCode(char3)
    }
    
    return result
  }
}

// GitHub API utilities
export const fetchGitHubRepos = async (username) => {
  try {
    const response = await secureFetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=50`)
    if (!response.ok) throw new Error('Failed to fetch repositories')
    return await response.json()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching GitHub repos:', error)
    }
    return []
  }
}

export const fetchGitHubUser = async (username) => {
  try {
    const response = await secureFetch(`https://api.github.com/users/${username}`)
    if (!response.ok) throw new Error('Failed to fetch user data')
    return await response.json()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching GitHub user:', error)
    }
    return null
  }
}

// Extract demo URL from README
export const extractDemoURL = (readmeContent) => {
  if (!readmeContent) return null
  
  // Multiple patterns to handle different emoji encodings and formats
  const patterns = [
    /🔗 Live Demo:\s*(https?:\/\/[^\s\)]+)/i,           // Original emoji
    /ð Live Demo:\s*(https?:\/\/[^\s\)]+)/i,           // Encoded emoji
    /Live Demo:\s*(https?:\/\/[^\s\)]+)/i,              // Without emoji
    /🔗.*?Live Demo.*?:\s*(https?:\/\/[^\s\)]+)/i,      // More flexible
    /Live Demo.*?:\s*(https?:\/\/[^\s\)]+)/i,           // Very flexible
  ]
  
  for (const pattern of patterns) {
    const match = readmeContent.match(pattern)
    if (match) {
      return match[1]
    }
  }
  
  return null
}

export const fetchRepoReadme = async (username, repoName) => {
  try {
    const response = await secureFetch(`https://api.github.com/repos/${username}/${repoName}/readme`)
    
    // Handle 404s and other HTTP errors silently
    if (!response.ok) {
      if (response.status === 404) {
        // Repository doesn't have a README file - this is normal
        return null
      }
      // Other HTTP errors (403, 500, etc.)
      return null
    }
    
    const data = await response.json()
    
    // Safely decode base64 content
    if (data.content) {
      const content = decodeBase64(data.content.replace(/\s/g, ''))
      return content
    }
    
    return null
  } catch (error) {
    // Catch any other errors (network issues, JSON parsing, etc.)
    // Silently handle to prevent console spam
    return null
  }
}

// Utility to format numbers
export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

// Utility to format dates
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
