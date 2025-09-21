import { motion } from "framer-motion"
import { skills } from "../data/personal"

const Skills = () => {
  // Organize skills into three rows for marquee animation
  const getAllSkills = () => {
    return Object.values(skills).flat()
  }

  const skillRows = [
    // Row 1: Frontend + Backend (scrolls left to right)
    [...skills.frontend, ...skills.backend],
    // Row 2: Database + Cloud (scrolls right to left)  
    [...skills.database, ...skills.cloud],
    // Row 3: Tools (scrolls left to right)
    [...skills.tools]
  ]

  // Add gradient backgrounds for different skill categories
  const getCategoryGradient = (category) => {
    const gradients = {
      Frontend: "from-blue-500 to-cyan-500",
      Backend: "from-green-500 to-emerald-500", 
      Database: "from-orange-500 to-red-500",
      Cloud: "from-purple-500 to-pink-500",
      Tools: "from-yellow-500 to-orange-500"
    }
    return gradients[category] || "from-gray-500 to-gray-600"
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  // Marquee Row Component
  const MarqueeRow = ({ skills, direction = "left", speed = "normal" }) => {
    const directionClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
    const speedDuration = speed === "slow" ? "60s" : speed === "fast" ? "20s" : "40s"
    
    // Duplicate skills for seamless infinite scroll
    const duplicatedSkills = [...skills, ...skills]
    
    return (
      <div className="relative overflow-hidden py-4 w-full">
        <div className="flex gap-6 whitespace-nowrap">
          <div 
            className={`flex gap-6 ${directionClass}`}
            style={{
              animationDuration: speedDuration,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite"
            }}
          >
            {duplicatedSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className={`
                  relative px-4 sm:px-6 py-4 rounded-2xl border border-border/40 
                  bg-gradient-to-r ${getCategoryGradient(skill.category)} 
                  hover:scale-105 sm:hover:scale-110 hover:shadow-2xl hover:z-10
                  transition-all duration-300 ease-out
                  min-w-[160px] sm:min-w-[200px] text-center
                  backdrop-blur-sm bg-opacity-90
                `}>
                  {/* Skill Icon */}
                  <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  
                  {/* Skill Name */}
                  <h3 className="font-bold text-white text-sm sm:text-lg mb-1 drop-shadow-sm">
                    {skill.name}
                  </h3>
                  
                  {/* Skill Level */}
                  <div className="text-white/90 text-xs sm:text-sm font-medium">
                    {skill.level}% Mastery
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 px-1 sm:px-2 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white font-medium border border-white/30">
                    {skill.category}
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-all duration-300 pointer-events-none" />
                  
                  {/* Shimmer Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Fade masks for seamless edges */}
        <div className="absolute top-0 left-0 w-16 sm:w-32 h-full bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-16 sm:w-32 h-full bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10" />
      </div>
    )
  }

  return (
    <section id="skills" className="py-20 lg:py-32 relative overflow-hidden w-full">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-2 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-primary font-medium text-sm">My Arsenal</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent-foreground mb-6"
          >
            Tech <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-blue-600 bg-clip-text text-transparent">Stack</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Technologies I've mastered and tools I use to craft exceptional digital experiences. Each skill represents countless hours of learning, building, and perfecting.
          </motion.p>
        </motion.div>

        {/* Marquee Skills Display */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Row 1: Frontend + Backend (Left to Right) */}
          <motion.div variants={itemVariants}>
            <MarqueeRow skills={skillRows[0]} direction="left" speed="normal" />
          </motion.div>

          {/* Row 2: Database + Cloud (Right to Left) */}
          <motion.div variants={itemVariants}>
            <MarqueeRow skills={skillRows[1]} direction="right" speed="normal" />
          </motion.div>

          {/* Row 3: Tools (Left to Right) */}
          <motion.div variants={itemVariants}>
            <MarqueeRow skills={skillRows[2]} direction="left" speed="normal" />
          </motion.div>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-20 text-center px-4 sm:px-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-4 sm:p-8 glass-card rounded-3xl bg-gradient-to-r from-primary/5 to-blue-500/5 border border-primary/20 max-w-full"
          >
            <div className="text-center flex-1 min-w-0">
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">
                {getAllSkills().length}+
              </div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">
                Technologies
              </div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-border flex-shrink-0" />
            <div className="text-center flex-1 min-w-0">
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">
                2.5+
              </div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">
                Years Experience
              </div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-border flex-shrink-0" />
            <div className="text-center flex-1 min-w-0">
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">
                5
              </div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">
                Categories
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
