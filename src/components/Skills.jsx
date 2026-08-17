import { motion } from "framer-motion"
import { skills } from "../data/personal"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const SkillChip = ({ item }) => {
  const Icon = item.icon
  return (
    <div
      className="group flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-border/60 bg-background/50 hover:border-border transition-colors duration-200"
    >
      <span
        className="flex items-center justify-center w-6 h-6 rounded-full shrink-0"
        style={{ backgroundColor: `${item.color}1a`, color: item.color }}
      >
        <Icon className="w-3.5 h-3.5" />
      </span>
      <span className="text-sm font-medium text-foreground/90 whitespace-nowrap">
        {item.name}
      </span>
    </div>
  )
}

const CategoryCard = ({ category }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -4 }}
    className="glass-card p-6 sm:p-7 rounded-2xl border border-border/50 h-full"
  >
    <h3 className="text-lg font-bold text-accent-foreground mb-1">
      {category.title}
    </h3>
    <p className="text-sm text-muted-foreground mb-5">
      {category.description}
    </p>
    <div className="flex flex-wrap gap-2">
      {category.items.map((item) => (
        <SkillChip key={item.name} item={item} />
      ))}
    </div>
  </motion.div>
)

const Skills = () => {
  const categories = Object.values(skills)
  const totalSkills = categories.reduce((sum, c) => sum + c.items.length, 0)

  return (
    <section id="skills" className="py-20 lg:py-32 relative overflow-hidden w-full">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-primary font-medium text-sm">Tech Stack</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent-foreground mb-6"
          >
            What I{" "}
            <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Build With
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed"
          >
            The languages, frameworks and tools I use to ship production applications end to end.
          </motion.p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center px-4 sm:px-0"
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
                {totalSkills}+
              </div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">
                Technologies
              </div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-border flex-shrink-0" />
            <div className="text-center flex-1 min-w-0">
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">
                2+
              </div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">
                Years Experience
              </div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-border flex-shrink-0" />
            <div className="text-center flex-1 min-w-0">
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">
                {categories.length}
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
