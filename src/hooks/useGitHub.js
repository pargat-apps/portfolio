import { useState, useEffect } from 'react'
import { 
  fetchGitHubRepos, 
  fetchGitHubUser, 
  fetchRepoReadme, 
  extractDemoURL,
  extractDescription
} from '../utils/api'

export const useGitHub = (username) => {
  const [repos, setRepos] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!username) return

      try {
        setLoading(true)
        setError(null)

        // Fetch user data and repositories in parallel
        const [userResult, reposResult] = await Promise.all([
          fetchGitHubUser(username),
          fetchGitHubRepos(username)
        ])

        setUser(userResult)

        // Filter and enhance repositories
        const filteredRepos = reposResult
          .filter(repo => !repo.fork && !repo.archived)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 12) // Get top 12 repositories

        // Fetch README for each repo to extract demo URLs
        // Process repos in smaller batches to be more API-friendly
        const enhancedRepos = await Promise.all(
          filteredRepos.map(async (repo, index) => {
            try {
              // Skip README fetch for repositories that are unlikely to have demo links
              // (very small repos, certain naming patterns, etc.)
              const skipReadme = (
                repo.size < 10 || // Very small repos
                /^(test|demo|example)-?\d*$/i.test(repo.name) || // Test/demo repos
                /^leetcode|^lc-|^LCOF/i.test(repo.name) || // LeetCode problem repos
                repo.language === null // Repos with no primary language
              )
              
              if (skipReadme) {
                return {
                  ...repo,
                  demoUrl: null,
                  description: repo.description,
                  enhanced: true
                }
              }

              const readme = await fetchRepoReadme(username, repo.name)
              const demoUrl = extractDemoURL(readme)
              const description = extractDescription(readme)
              
              return {
                ...repo,
                demoUrl,
                description: description || repo.description,
                enhanced: true
              }
            } catch {
              return repo
            }
          })
        )

        setRepos(enhancedRepos)
      } catch (err) {
        setError(err.message)
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching GitHub data:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [username])

  const getFeaturedRepos = () => {
    return repos
      .filter(repo => repo.stargazers_count > 0 || repo.demoUrl)
      .slice(0, 6)
  }

  const getReposByLanguage = () => {
    const languageStats = {}
    
    repos.forEach(repo => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1
      }
    })

    return Object.entries(languageStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
  }

  const getTotalStats = () => {
    return {
      totalRepos: repos.length,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      totalCommits: user?.public_repos || 0,
      followers: user?.followers || 0,
      following: user?.following || 0
    }
  }

  return {
    repos,
    user,
    loading,
    error,
    getFeaturedRepos,
    getReposByLanguage,
    getTotalStats,
    refetch: () => fetchGitHubData()
  }
}
