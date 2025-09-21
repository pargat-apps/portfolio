import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "../../hooks/useTheme"
import { Button } from "./Button"

const ThemeToggle = () => {
  const { isDark, toggle } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="relative overflow-hidden rounded-full hover:bg-accent/20"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="relative"
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-accent-foreground" />
        ) : (
          <Sun className="h-4 w-4 text-accent-foreground" />
        )}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark 
            ? "0 0 20px rgba(99, 102, 241, 0.3)" 
            : "0 0 20px rgba(245, 158, 11, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      />
    </Button>
  )
}

export default ThemeToggle
