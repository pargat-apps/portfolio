import { useRef, useState } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"
import { experience, techIcons } from "../data/personal"

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

const TimelineItem = ({ exp, index }) => {
  const [expanded, setExpanded] = useState(false)
  const primaryAchievements = exp.achievements.slice(0, 2)
  const extraAchievements = exp.achievements.slice(2)
  const isEducation = exp.type === "Education"

  return (
    <motion.div
      className="relative pl-12 md:pl-16"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
    >
      {/* Timeline node */}
      <div className="absolute left-4 md:left-6 top-2 -translate-x-1/2">
        {index === 0 && (
          <motion.span
            className="absolute inset-0 rounded-full bg-primary/40"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.div
          className={`relative w-3 h-3 rounded-full border-2 border-background ${
            isEducation ? "bg-blue-500" : "bg-primary"
          }`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (index % 4) * 0.08 + 0.15, type: "spring", stiffness: 350, damping: 20 }}
        />
      </div>

      <motion.div
        className="glass-card p-5 sm:p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
        whileHover={{ y: -2 }}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
          <span
            className={`text-xs font-semibold tracking-wider uppercase ${
              isEducation ? "text-blue-500" : "text-primary"
            }`}
          >
            {exp.type}
          </span>
          <span className="text-xs text-muted-foreground">{exp.duration}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-accent-foreground mb-1">
          {exp.role}
        </h3>
        <div className="flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground mb-3">
          <span className="font-medium text-accent-foreground/80">{exp.company}</span>
          <span className="text-muted-foreground/50">·</span>
          <span>{exp.location}</span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {exp.description}
        </p>

        {primaryAchievements.length > 0 && (
          <ul className="space-y-1.5">
            {primaryAchievements.map((achievement, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary/60 select-none">–</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}

        <AnimatePresence initial={false}>
          {expanded && extraAchievements.length > 0 && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-1.5 overflow-hidden"
            >
              {extraAchievements.map((achievement, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed pt-1.5">
                  <span className="text-primary/60 select-none">–</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {extraAchievements.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-2"
          >
            {expanded ? "Show less" : `Show ${extraAchievements.length} more`}
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}

        {exp.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {exp.technologies.map((tech) => {
              const iconData = techIcons[tech]
              const Icon = iconData?.icon
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/70 text-xs font-medium text-accent-foreground/80"
                >
                  {Icon && <Icon className="w-3 h-3" style={{ color: iconData.color }} />}
                  {tech}
                </span>
              )
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

const Experience = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  return (
    <section id="experience" className="py-20 lg:py-32">
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
            My <span className="text-gradient">Journey</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full mb-6"
          />
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Where I've studied and worked, from B.Tech to full-stack development
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Base line */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-border" />
          {/* Scroll-linked progress line */}
          <motion.div
            className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary to-blue-600 origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <TimelineItem key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-accent-foreground mb-4">
              Ready for the Next Challenge
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm always excited to take on new projects and collaborate with talented teams.
              Let's build something amazing together!
            </p>
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground font-medium rounded-full hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
