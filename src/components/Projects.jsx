import { motion } from "framer-motion"
import { useState } from "react"
import { Github, ExternalLink, Star, GitFork, Calendar, Code, Loader2 } from "lucide-react"
import { Button } from "./ui/Button"
import { useGitHub } from "../hooks/useGitHub"
import { personalInfo, projects as staticProjects } from "../data/personal"
import { formatDate } from "../utils/api"

const Projects = () => {
  const [activeTab, setActiveTab] = useState("github")
  const { repos, loading, error, getFeaturedRepos, getTotalStats } = useGitHub(personalInfo.githubUsername)

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

  const ProjectCard = ({ project, isGithub = false }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="glass-card p-6 h-full flex flex-col group hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isGithub ? (
            <Github className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Code className="w-5 h-5 text-primary" />
          )}
          <h3 className="font-semibold text-accent-foreground group-hover:text-primary transition-colors">
            {project.name || project.title}
          </h3>
        </div>
        
        {isGithub && (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {project.stargazers_count > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {project.stargazers_count}
              </div>
            )}
            {project.forks_count > 0 && (
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {project.forks_count}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {isGithub ? (
          project.language && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {project.language}
            </span>
          )
        ) : (
          project.technologies?.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-muted text-accent-foreground text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))
        )}
        
        {project.featured && (
          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-primary-foreground text-xs font-medium rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Metadata */}
      {isGithub && project.updated_at && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4" />
          Updated {formatDate(project.updated_at)}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        {isGithub ? (
          <>
            <motion.a
              href={project.html_url}
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
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
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
            )}
          </>
        ) : (
          <>
            {project.github && (
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
            )}
            {project.demo && (
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
            )}
          </>
        )}
      </div>
    </motion.div>
  )

  const stats = getTotalStats()

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
            A complete showcase of all my projects, from dynamic web applications to innovative solutions
          </motion.p>
        </motion.div>

        {/* GitHub Stats */}
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              variants={itemVariants}
              className="text-center p-4 glass-card rounded-lg"
            >
              <div className="text-2xl font-bold text-primary mb-1">
                {stats.totalRepos}
              </div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="text-center p-4 glass-card rounded-lg"
            >
              <div className="text-2xl font-bold text-primary mb-1">
                {stats.totalStars}
              </div>
              <div className="text-sm text-muted-foreground">Stars</div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="text-center p-4 glass-card rounded-lg"
            >
              <div className="text-2xl font-bold text-primary mb-1">
                {stats.totalForks}
              </div>
              <div className="text-sm text-muted-foreground">Forks</div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="text-center p-4 glass-card rounded-lg"
            >
              <div className="text-2xl font-bold text-primary mb-1">
                {stats.followers}
              </div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </motion.div>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveTab("github")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === "github"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-accent-foreground hover:bg-accent"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4 mr-2 inline" />
            GitHub Projects
          </motion.button>
          
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveTab("featured")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === "featured"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-accent-foreground hover:bg-accent"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="w-4 h-4 mr-2 inline" />
            Featured Work
          </motion.button>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {loading && activeTab === "github" ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading projects...</span>
            </div>
          ) : error && activeTab === "github" ? (
            <div className="col-span-full text-center py-20">
              <div className="text-muted-foreground mb-4">
                Failed to load GitHub projects
              </div>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : activeTab === "github" ? (
            repos.map((repo) => (
              <ProjectCard key={repo.id} project={repo} isGithub={true} />
            ))
          ) : (
            staticProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isGithub={false} />
            ))
          )}
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
