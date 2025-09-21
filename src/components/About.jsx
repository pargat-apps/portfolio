import { motion } from "framer-motion"
import { Download, ExternalLink, Coffee, Code2, Zap } from "lucide-react"
import { Button } from "./ui/Button"
import { personalInfo } from "../data/personal"
import { useGitHub } from "../hooks/useGitHub"

const About = () => {
  const { user } = useGitHub(personalInfo.githubUsername)

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

  const stats = [
    { label: "Years Experience", value: "2.5+", icon: Code2 },
    { label: "Projects Completed", value: "25+", icon: Zap },
    { label: "Cups of Coffee", value: "∞", icon: Coffee },
  ]

  return (
    <section id="about" className="py-20 lg:py-32">
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
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-accent-foreground mb-4">
                Building Digital Experiences That Matter
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {personalInfo.bio}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold text-accent-foreground mb-3">
                Beyond The Code
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {personalInfo.funFact}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 py-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-lg bg-card/50 border border-border/50"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-accent-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Resume Download */}
            <motion.div variants={itemVariants}>
              <motion.a
                href={personalInfo.resume}
                download="Pargat_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image & Design Elements */}
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="relative">
              {/* Main profile container */}
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                {/* Animated background elements */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                <motion.div
                  className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-600/20 to-primary/20"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* GitHub Profile Image */}
                <div className="absolute inset-8 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-primary to-blue-600">
                  {user?.avatar_url ? (
                    <motion.img
                      src={user.avatar_url}
                      alt={`${personalInfo.name}'s GitHub Profile`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback initials (shown when image fails to load or while loading) */}
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ display: user?.avatar_url ? 'none' : 'flex' }}
                  >
                    <div className="text-6xl lg:text-8xl font-bold text-primary-foreground">
                      {personalInfo.name.split(" ")[0][0]}{personalInfo.name.split(" ")[1][0]}
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full backdrop-blur-xl border border-primary/20 flex items-center justify-center"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Code2 className="w-8 h-8 text-primary" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-600/10 rounded-full backdrop-blur-xl border border-blue-600/20 flex items-center justify-center"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Zap className="w-10 h-10 text-blue-600" />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -left-8 w-12 h-12 bg-purple-600/10 rounded-full backdrop-blur-xl border border-purple-600/20 flex items-center justify-center"
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Coffee className="w-6 h-6 text-purple-600" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
