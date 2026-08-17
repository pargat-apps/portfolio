import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, MapPin, Code } from "lucide-react"
import { Button } from "./ui/Button"
import { personalInfo } from "../data/personal"

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-blue-600/10 animate-gradient"></div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-20 w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text column */}
          <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Code className="w-4 h-4 mr-2" />
                Available for new opportunities
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent-foreground leading-tight">
                Hi, I'm{" "}
                <span className="text-gradient bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {personalInfo.name.split(" ")[0]}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-muted-foreground">
                {personalInfo.title}
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {personalInfo.heroDescription}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-primary font-medium italic">
                "{personalInfo.tagline}"
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="shadow-glow hover:shadow-glow-lg transition-all duration-300 text-lg px-8 py-6"
                    onClick={() => scrollToSection("#projects")}
                  >
                    View My Work
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 hover:bg-accent/50"
                    onClick={() => scrollToSection("#contact")}
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-2">
                <motion.a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-accent/50 hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>

                <motion.a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-accent/50 hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>

                <motion.a
                  href={personalInfo.social.email}
                  className="p-3 rounded-full bg-accent/50 hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Photo column */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center order-1 lg:order-2"
          >
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary/30 to-blue-600/20 rounded-full blur-3xl scale-90" />

            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-glow-lg"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img
                src="/images/linkedin_image_me.jpeg"
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute -top-2 right-2 sm:right-4 glass-card px-4 py-2 flex items-center gap-2 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium whitespace-nowrap">{personalInfo.title}</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 left-2 sm:left-4 glass-card px-4 py-2 flex items-center gap-2 shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium whitespace-nowrap">{personalInfo.location}</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="hidden sm:flex justify-center absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection("#about")}
            className="p-2 rounded-full hover:bg-accent/50 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
