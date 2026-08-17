import { motion } from "framer-motion"
import { Download, ExternalLink, Code2, Database, Building2, MapPin, GraduationCap } from "lucide-react"
import { Button } from "./ui/Button"
import { personalInfo } from "../data/personal"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
}

const stats = [
  { label: "Years Experience", value: "2+", icon: Code2 },
  { label: "Customer Records Managed", value: "10K+", icon: Database },
  { label: "Companies", value: "2", icon: Building2 },
]

const quickFacts = [
  { icon: MapPin, text: personalInfo.location },
  { icon: GraduationCap, text: "Post-Grad Diploma @ Lambton College" },
]

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Quick facts */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {quickFacts.map((fact) => (
              <span
                key={fact.text}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent/50 border border-border/50 text-sm text-muted-foreground"
              >
                <fact.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {fact.text}
              </span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground leading-relaxed text-lg text-center"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Beyond the code */}
          <motion.div
            variants={itemVariants}
            className="glass-card border-l-4 border-l-primary p-6 text-left"
          >
            <p className="text-muted-foreground leading-relaxed">
              {personalInfo.funFact}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
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
          <motion.div variants={itemVariants} className="text-center">
            <motion.a
              href={personalInfo.resume}
              download="Pargat_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
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
      </div>
    </section>
  )
}

export default About
