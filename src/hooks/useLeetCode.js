import { useState, useEffect } from 'react'
import { fetchLeetCodeStats } from '../utils/api'

export const useLeetCode = (username) => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      if (!username) return

      try {
        setLoading(true)
        setError(null)

        const data = await fetchLeetCodeStats(username)
        setStats(data)
      } catch (err) {
        setError(err.message)
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching LeetCode stats:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [username])

  const getProgressPercentage = () => {
    if (!stats) return 0
    const total = stats.easySolved + stats.mediumSolved + stats.hardSolved
    return total > 0 ? Math.round((total / 2000) * 100) : 0 // Assuming 2000 total problems
  }

  const getDifficultyProgress = () => {
    if (!stats) return { easy: 0, medium: 0, hard: 0 }
    
    return {
      easy: Math.round((stats.easySolved / 600) * 100), // Assuming 600 easy problems
      medium: Math.round((stats.mediumSolved / 1200) * 100), // Assuming 1200 medium problems
      hard: Math.round((stats.hardSolved / 500) * 100), // Assuming 500 hard problems
    }
  }

  return {
    stats,
    loading,
    error,
    getProgressPercentage,
    getDifficultyProgress,
    refetch: () => fetchStats()
  }
}
