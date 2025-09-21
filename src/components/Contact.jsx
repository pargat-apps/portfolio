import { motion } from "framer-motion"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin,
  CheckCircle,
  ExternalLink,
  Clock,
  User,
  Briefcase,
  Calendar,
  Star,
  MessageSquare,
  Download,
  Copy,
  Check,
  ArrowRight
} from "lucide-react"
import { personalInfo } from "../data/personal"
import { useState } from "react"

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      label: "Email Me",
      value: personalInfo.email,
      href: personalInfo.social.email,
      color: "from-blue-500 via-purple-500 to-cyan-500",
      description: "Drop me an email for detailed discussions",
      action: "Send Email",
      copyable: true
    },
    {
      icon: Phone,
      label: "Call Me",
      value: personalInfo.phone,
      href: personalInfo.social.phone,
      color: "from-green-500 via-emerald-500 to-teal-500",
      description: "For urgent matters or quick calls",
      action: "Call Now",
      copyable: false
    },
    {
      icon: MessageSquare,
      label: "Let's Chat",
      value: "LinkedIn Messages",
      href: personalInfo.social.linkedin,
      color: "from-orange-500 via-pink-500 to-red-500",
      description: "Connect and message me on LinkedIn",
      action: "Open LinkedIn",
      copyable: false
    }
  ]

  const socialPlatforms = [
    {
      icon: Github,
      name: "GitHub",
      username: "@pargat-apps",
      href: personalInfo.social.github,
      color: "hover:bg-gray-900 dark:hover:bg-gray-100",
      iconColor: "group-hover:text-white dark:group-hover:text-black",
      description: "Check out my code"
    },
    {
      icon: Linkedin,
      name: "LinkedIn", 
      username: "@pargat1204",
      href: personalInfo.social.linkedin,
      color: "hover:bg-blue-600",
      iconColor: "group-hover:text-white",
      description: "Let's connect professionally"
    }
  ]

  const quickStats = [
    {
      icon: Clock,
      label: "Response Time",
      value: "< 24 hours",
      description: "Average response time"
    },
    {
      icon: CheckCircle,
      label: "Availability",
      value: "Open to work",
      description: "Currently seeking opportunities"
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      description: "Based in Canada"
    },
    {
      icon: Calendar,
      label: "Best Time",
      value: "9 AM - 6 PM EST",
      description: "Preferred contact hours"
    }
  ]

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

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-2 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
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
            <User className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">Let's Connect</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent-foreground mb-6"
          >
            Get In <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Ready to bring your ideas to life? I'm passionate about creating exceptional web experiences and always excited to collaborate on innovative projects. Let's discuss how we can work together!
          </motion.p>

          {/* Quick Stats */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="glass-card p-4 text-center group hover:scale-105 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-accent-foreground text-sm">{stat.value}</h4>
                <p className="text-muted-foreground text-xs mt-1">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Contact Methods */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold text-accent-foreground mb-8 flex items-center gap-3"
            >
              <MessageSquare className="w-6 h-6 text-primary" />
              How to reach me
            </motion.h3>

            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  variants={cardVariants}
                  className="glass-card p-6 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-accent-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                        {method.label}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-2">
                        {method.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-mono text-accent-foreground font-medium">
                          {method.value}
                        </span>
                        {method.copyable && (
                          <button
                            onClick={handleCopyEmail}
                            className="p-1 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                            title="Copy to clipboard"
                          >
                            {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                      <motion.a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary font-medium transition-all duration-300 text-sm group/button"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {method.action}
                        <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social & Additional Info */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Social Platforms */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-accent-foreground mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-primary" />
                Find me online
              </h3>
              
              <div className="space-y-4">
                {socialPlatforms.map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={cardVariants}
                    className={`glass-card p-6 flex items-center gap-4 group transition-all duration-300 ${platform.color}`}
                    whileHover={{ scale: 1.02, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-3 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors">
                      <platform.icon className={`w-6 h-6 ${platform.iconColor} transition-colors`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-accent-foreground group-hover:text-white transition-colors">
                        {platform.name}
                      </h4>
                      <p className="text-muted-foreground text-sm group-hover:text-gray-200 transition-colors">
                        {platform.username}
                      </p>
                      <p className="text-xs text-muted-foreground group-hover:text-gray-300 transition-colors mt-1">
                        {platform.description}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Resume Download */}
            <motion.div variants={cardVariants} className="glass-card p-6 text-center bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-accent-foreground mb-2">
                Want to know more?
              </h3>
              <p className="text-muted-foreground mb-6">
                Download my resume to see my complete experience, skills, and achievements.
              </p>
              <motion.a
                href={personalInfo.resume}
                download="Pargat_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                Download Resume
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Availability Status */}
            <motion.div 
              variants={cardVariants} 
              className="glass-card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <h3 className="font-bold text-green-700 dark:text-green-400">
                  Available for Opportunities
                </h3>
              </div>
              <p className="text-green-600 dark:text-green-300 text-sm leading-relaxed">
                I'm currently open to new opportunities and exciting projects. Whether you're looking for a full-time developer, freelance help, or just want to collaborate on something amazing, I'd love to hear from you!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
