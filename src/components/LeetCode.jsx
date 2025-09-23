import { motion } from "framer-motion"
import { Code, Trophy, Target, TrendingUp, Award, Loader2 } from "lucide-react"
import { useLeetCode } from "../hooks/useLeetCode"
import { personalInfo } from "../data/personal"

const LeetCode = () => {
  // Using your actual LeetCode username
  const leetcodeUsername = "pargat-apps"
  const { stats, loading, error, getProgressPercentage, getDifficultyProgress } = useLeetCode(leetcodeUsername)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: (percentage) => ({
      width: `${percentage}%`,
      transition: { duration: 1.5, ease: "easeOut" },
    }),
  }

  if (loading) {
    return (
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading LeetCode stats...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error || !stats) {
    return (
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center glass-card p-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <Code className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-accent-foreground mb-4">
                LeetCode Progress
              </h3>
              <p className="text-muted-foreground">
                Constantly improving problem-solving skills through coding challenges
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  const difficultyProgress = getDifficultyProgress()
  const overallProgress = getProgressPercentage()

  const difficultyData = [
    {
      name: "Easy",
      count: stats.easySolved,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      textColor: "text-green-700 dark:text-green-400",
      progress: difficultyProgress.easy
    },
    {
      name: "Medium", 
      count: stats.mediumSolved,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20", 
      textColor: "text-yellow-700 dark:text-yellow-400",
      progress: difficultyProgress.medium
    },
    {
      name: "Hard",
      count: stats.hardSolved,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      textColor: "text-red-700 dark:text-red-400",
      progress: difficultyProgress.hard
    }
  ]

  return (
    <section id="leetcode" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-foreground mb-4"
          >
            LeetCode <span className="text-gradient">Progress</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full mb-6"
          />
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Continuously sharpening problem-solving skills through algorithmic challenges
          </motion.p>
        </motion.div>

        {/* Main Stats */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Overall Progress */}
          <motion.div variants={itemVariants} className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-accent-foreground">
                Total Problems Solved
              </h3>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-primary">
                  {stats.totalSolved}
                </span>
                <span className="text-muted-foreground">
                  {overallProgress}% Complete
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-primary to-blue-600 h-3 rounded-full"
                  variants={progressVariants}
                  custom={overallProgress}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {stats.ranking && stats.ranking > 0 && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Ranking: {stats.ranking.toLocaleString()}</span>
                </div>
              )}
              
              {stats.acceptanceRate && stats.acceptanceRate > 0 && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="w-4 h-4" />
                  <span>Acceptance Rate: {stats.acceptanceRate}%</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div variants={itemVariants} className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-accent-foreground">
                Achievements
              </h3>
              <Award className="w-8 h-8 text-purple-500" />
            </div>

            {stats.badges && stats.badges.length > 0 ? (
              <div className="space-y-4">
                {stats.badges.map((badge, index) => (
                  <motion.div
                    key={badge.name || `badge-${index}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <h4 className="font-semibold text-accent-foreground">
                        {badge.name}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  More badges coming soon!
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Difficulty Breakdown */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {difficultyData
            .filter(difficulty => difficulty.count > 0)
            .map((difficulty, index) => (
            <motion.div
              key={difficulty.name}
              variants={itemVariants}
              className="glass-card p-6 hover:shadow-lg transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-accent-foreground">
                  {difficulty.name}
                </h3>
                <div className={`p-2 rounded-lg ${difficulty.bgColor}`}>
                  <Target className={`w-5 h-5 ${difficulty.textColor}`} />
                </div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-accent-foreground mb-2">
                  {difficulty.count}
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className={`bg-gradient-to-r ${difficulty.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${difficulty.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>

              <div className={`text-sm font-medium ${difficulty.textColor}`}>
                {difficulty.progress}% in {difficulty.name} category
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${difficulty.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-accent-foreground mb-4">
              Problem-Solving Mindset
            </h3>
            <p className="text-muted-foreground mb-6">
              Every algorithm challenge strengthens my ability to write efficient, 
              scalable code and tackle complex technical problems in real-world applications.
            </p>
            <motion.a
              href={`https://leetcode.com/u/${leetcodeUsername}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-primary-foreground font-medium rounded-full hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View LeetCode Profile
              <Code className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LeetCode
