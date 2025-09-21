import { motion } from "framer-motion"
import { Calendar, MapPin, Briefcase, Award, ChevronRight, GraduationCap, Building2 } from "lucide-react"
import { experience } from "../data/personal"

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  }

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
            My educational pursuits and professional experience in full-stack development
          </motion.p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-primary to-blue-600 origin-top"
            style={{ height: "calc(100% - 2rem)" }}
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:gap-8`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Timeline Node */}
                <motion.div
                  className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-background shadow-lg z-10 flex items-center justify-center ${
                    exp.duration.includes("Present") 
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 animate-pulse" 
                      : exp.type === "Education"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                      : "bg-gradient-to-r from-primary to-blue-600"
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  {exp.type === "Education" ? (
                    <GraduationCap className="w-4 h-4 text-white" />
                  ) : (
                    <Building2 className="w-4 h-4 text-white" />
                  )}
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? "" : "md:text-right"
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`glass-card p-6 hover:shadow-xl transition-all duration-300 group relative overflow-hidden ${
                    exp.duration.includes("Present") ? "ring-2 ring-green-500/30" : ""
                  }`}>
                    {/* Current Status Indicator */}
                    {exp.duration.includes("Present") && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        CURRENT
                      </div>
                    )}
                    
                    {/* Header */}
                    <div className="mb-4">
                      <div className={`flex items-center gap-2 mb-3 ${
                        index % 2 === 0 ? "" : "md:justify-end"
                      }`}>
                        <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${
                          exp.type === "Education"
                            ? exp.duration.includes("Present")
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-600"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-600"
                            : "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                        }`}>
                          {exp.type === "Education" ? (
                            <GraduationCap className="w-4 h-4" />
                          ) : (
                            <Briefcase className="w-4 h-4" />
                          )}
                          {exp.type}
                        </div>
                      </div>
                      
                      <h3 className={`text-xl lg:text-2xl font-bold mb-2 transition-colors ${
                        exp.duration.includes("Present") 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-accent-foreground group-hover:text-primary"
                      }`}>
                        {exp.role}
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {exp.type === "Education" ? (
                            <GraduationCap className="w-5 h-5 text-primary" />
                          ) : (
                            <Building2 className="w-5 h-5 text-primary" />
                          )}
                          <span className="font-semibold text-accent-foreground text-lg">{exp.company}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{exp.location}</span>
                          </div>
                          <div className={`flex items-center gap-1 ${
                            exp.duration.includes("Present") ? "text-green-600 dark:text-green-400" : "text-primary"
                          }`}>
                            <Calendar className="w-4 h-4" />
                            <span className="font-semibold">{exp.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-accent-foreground mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.li
                            key={achIndex}
                            className="flex items-start gap-2 text-muted-foreground"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: achIndex * 0.1 }}
                          >
                            <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                            <span className="leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-accent-foreground mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-blue-600 rounded-full" />
                        Technologies & Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                              exp.type === "Education"
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                                : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                            }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: techIndex * 0.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Gradient Effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 to-blue-600/0 group-hover:from-primary/5 group-hover:to-blue-600/5 transition-all duration-300 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Spacer for desktop */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>

          {/* Timeline End Cap */}
          <motion.div
            className="absolute bottom-0 left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-primary to-blue-600 rounded-full"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          />
        </div>

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
