import { motion } from "framer-motion"
import { Github, ExternalLink, Star, Layers, ShoppingCart, Video, Server, Code } from "lucide-react"
import { Button } from "./ui/Button"
import { personalInfo, projects } from "../data/personal"

const categoryStyles = {
  "Full-Stack": { icon: Layers, gradient: "from-blue-500 to-purple-600" },
  "E-Commerce": { icon: ShoppingCart, gradient: "from-orange-500 to-pink-500" },
  "Real-Time": { icon: Video, gradient: "from-teal-500 to-cyan-500" },
  "Backend": { icon: Server, gradient: "from-green-500 to-emerald-600" },
  "Frontend": { icon: Code, gradient: "from-indigo-500 to-blue-500" },
}

const getCategoryStyle = (category) =>
  categoryStyles[category] || { icon: Code, gradient: "from-gray-500 to-gray-600" }

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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
}

const ProjectCard = ({ project }) => {
  const { icon: CategoryIcon, gradient } = getCategoryStyle(project.category)

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden h-full flex flex-col group hover:shadow-xl transition-all duration-300"
    >
      {/* Cover */}
      <div className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none"
            }}
          />
        ) : (
          <CategoryIcon className="w-14 h-14 text-white/40" strokeWidth={1.5} />
        )}

        {project.featured && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/30">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </span>
        )}

        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-medium">
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-lg text-accent-foreground group-hover:text-primary transition-colors mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-muted text-accent-foreground text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          {project.github ? (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" className="w-full">
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </motion.a>
          ) : (
            <Button variant="outline" className="flex-1 opacity-50 cursor-not-allowed" disabled>
              <Github className="w-4 h-4 mr-2" />
              Code
            </Button>
          )}

          {project.demo ? (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </motion.a>
          ) : (
            <Button className="flex-1 opacity-50 cursor-not-allowed" disabled>
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <section id="projects" className="py-20 lg:py-32">
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
            My <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full mb-6"
          />
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            A selection of projects, from full-stack web applications to real-time systems
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.a
            href={`https://github.com/${personalInfo.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-shadow">
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
