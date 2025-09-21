import { motion } from "framer-motion"
import { Heart, Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import { Button } from "./ui/Button"
import { personalInfo } from "../data/personal"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { 
      name: "GitHub", 
      icon: Github, 
      href: personalInfo.social.github,
      color: "hover:text-gray-700 dark:hover:text-gray-300" 
    },
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      href: personalInfo.social.linkedin,
      color: "hover:text-blue-600" 
    },
    { 
      name: "Email", 
      icon: Mail, 
      href: personalInfo.social.email,
      color: "hover:text-red-500" 
    },
  ]

  return (
    <footer className="relative bg-input/50 border-t border-border/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                  P
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-accent-foreground">
                  {personalInfo.name}
                </h3>
                <p className="text-muted-foreground">
                  {personalInfo.title}
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Building exceptional digital experiences with modern technologies. 
              Always excited to take on new challenges and create innovative solutions.
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and lots of ☕ in {personalInfo.location.split(", ")[1]}</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-accent-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(link.href)
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold text-accent-foreground mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a
                href={personalInfo.social.email}
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.social.phone}
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {personalInfo.phone}
              </a>
              <div className="text-muted-foreground">
                {personalInfo.location}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-accent/50 text-muted-foreground transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-border/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <div className="text-muted-foreground text-sm">
              Built with React, Tailwind CSS & Framer Motion
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollToTop}
                className="rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Status Indicator */}
        <motion.div
          className="absolute top-6 right-6 hidden lg:flex items-center gap-2 text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-muted-foreground">Available for hire</span>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
