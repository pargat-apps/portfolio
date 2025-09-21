import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, ExternalLink } from "lucide-react"
import { Button } from "./ui/Button"
import ThemeToggle from "./ui/ThemeToggle"
import { personalInfo } from "../data/personal"
import { useGitHub } from "../hooks/useGitHub"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useGitHub(personalInfo.githubUsername)

  const navigationItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg shadow-black/5 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            onClick={() => scrollToSection("#hero")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Stylized Logo Icon */}
            <div className="relative logo-glow">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.6 }}
              >
                {/* Custom Monogram */}
                <div className="relative">
                  <span className="text-white font-black text-2xl tracking-tight select-none">
                    P
                  </span>
                  <span className="absolute -top-1 -right-1 text-white/80 font-bold text-sm">
                    S
                  </span>
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
            </div>

            {/* Brand Name */}
            <div className="hidden sm:flex flex-col">
              <motion.div
                className="flex items-center space-x-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-2xl font-black bg-gradient-to-r from-accent-foreground via-primary to-blue-600 bg-clip-text text-transparent tracking-tight logo-text">
                  Pargat
                </span>
                <span className="text-2xl font-black text-accent-foreground tracking-tight logo-text">
                  Singh
                </span>
              </motion.div>
              
              {/* Subtle tagline */}
              <motion.div
                className="text-xs text-muted-foreground font-medium tracking-wider opacity-70 -mt-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                pargatfolio.com
              </motion.div>
            </div>

            {/* Mobile version - just initials */}
            <div className="sm:hidden">
              <motion.span
                className="text-xl font-black bg-gradient-to-r from-accent-foreground via-primary to-blue-600 bg-clip-text text-transparent logo-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                PS
              </motion.span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-accent-foreground transition-colors duration-200 font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <motion.a
              href={personalInfo.resume}
              download="Pargat_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="shadow-lg hover:shadow-xl transition-shadow">
                <Download className="w-4 h-4 mr-2" />
                Resume
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border/10 mt-2"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-muted-foreground hover:text-accent-foreground transition-colors duration-200 font-medium py-2"
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.a
                href={personalInfo.resume}
                download="Pargat_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full shadow-lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
