import {
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiWebrtc,
  SiMysql,
  SiMongodb,
  SiLinux,
  SiDocker,
  SiGit,
  SiGithub,
  SiNpm,
  SiPostman,
  SiMeta,
  SiWhatsapp,
  SiPaypal,
  SiPaytm,
  SiPhonepe,
  SiClaude,
} from "react-icons/si"
import { FaAws } from "react-icons/fa"
import { Webhook, Radio, Workflow } from "lucide-react"

export const personalInfo = {
  name: "Pargat Singh",
  title: "Full-Stack Developer",
  location: "Ottawa, ON, Canada",
  phone: "+1 (613) 866 2971",
  email: "pargatttsinghhh@gmail.com",
  website: "pargatfolio.com",
  github: "github.com/pargat-apps",
  githubUsername: "pargat-apps",
  linkedin: "linkedin.com/in/pargat1204",
  
  bio: "Passionate Full-Stack Developer with 2.5+ years of experience building scalable web applications and optimizing system performance. Currently pursuing advanced studies in Full Stack Software Development at Lambton College, Ottawa. I excel at transforming complex problems into elegant, user-friendly solutions.",
  
  funFact: "When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and building innovative solutions that make a difference. I believe in writing clean, maintainable code and staying updated with the latest industry trends.",
  
  tagline: "Building the future, one line of code at a time",
  
  heroDescription: "I'm a dedicated full-stack developer who loves creating exceptional digital experiences. With expertise in modern web technologies and a passion for clean, efficient code, I turn ideas into powerful, scalable applications.",
  
  resume: "/PARGAT_SINGH_RESUME.pdf", // Path to resume file
  
  social: {
    github: "https://github.com/pargat-apps",
    linkedin: "https://linkedin.com/in/pargat1204",
    email: "mailto:pargatttsinghhh@gmail.com",
    phone: "tel:+16138662971"
  }
}

export const experience = [
  {
    id: 1,
    company: "Lambton College",
    role: "Postgraduate Diploma - Full Stack Software Development",
    location: "Ottawa, ON, Canada",
    duration: "Jan 2024 – Present",
    type: "Education",
    description: "Currently pursuing advanced studies in full-stack development with hands-on experience in modern web technologies, cloud platforms, and industry-standard development practices.",
    achievements: [
      "Mastering advanced React.js concepts including hooks, context API, and performance optimization",
      "Developing expertise in cloud platforms (AWS) and modern deployment strategies",
      "Building real-world applications using MERN stack with professional coding standards",
      "Learning DevOps practices including CI/CD pipelines and containerization with Docker",
      "Collaborating on team projects using Agile methodologies and version control best practices",
      "Completing capstone project demonstrating full-stack application development skills"
    ],
    technologies: ["React", "Redux", "Node.js", "Express.js", "MongoDB", "AWS", "Docker", "Git", "Agile"]
  },
  {
    id: 2,
    company: "Mozo Cloud Services Pvt Ltd",
    role: "Full-Stack Developer",
    location: "Chandigarh, India",
    duration: "Jan 2022 – Dec 2023",
    type: "Full-time",
    description: "Led full-stack development initiatives, optimizing system performance and delivering scalable solutions for enterprise clients.",
    achievements: [
      "Built and optimized responsive web applications with React.js and Node.js, improving user engagement by 35%",
      "Designed scalable SQL database schemas supporting 10,000+ customer records with optimized query performance",
      "Developed asynchronous services and REST APIs in Express.js for real-time system monitoring and alerts",
      "Successfully debugged and refactored legacy code, fixing 100+ high-priority bugs while maintaining 99.9% uptime",
      "Built a real-time video chat application using WebRTC with peer-to-peer communication capabilities",
      "Managed version control with Git/GitHub and executed comprehensive full-stack test suites"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "SQL", "MySQL", "Git", "GitHub", "WebRTC", "REST APIs"]
  }
]

export const skills = {
  frontend: {
    title: "Languages & Front End",
    description: "Responsive, cross-browser interfaces",
    items: [
      { name: "JavaScript (ES6+)", icon: SiJavascript, color: "#F7DF1E" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  backend: {
    title: "Back End & APIs",
    description: "REST APIs, real-time systems, auth & RBAC",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#71717a" },
      { name: "REST APIs", icon: Webhook, color: "#FF6B6B" },
      { name: "WebSockets", icon: Radio, color: "#2dd4bf" },
      { name: "WebRTC", icon: SiWebrtc, color: "#71717a" },
    ],
  },
  database: {
    title: "Databases",
    description: "Schema design, indexing, query optimization",
    items: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
  },
  cloud: {
    title: "Cloud, DevOps & Tools",
    description: "Deployment, CI/CD and production debugging",
    items: [
      { name: "AWS EC2", icon: FaAws, color: "#FF9900" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#71717a" },
      { name: "CI/CD", icon: Workflow, color: "#8b5cf6" },
      { name: "npm", icon: SiNpm, color: "#CB3837" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ],
  },
  integrations: {
    title: "Integrations",
    description: "Messaging, telephony and payment gateways",
    items: [
      { name: "Meta Graph API", icon: SiMeta, color: "#0866FF" },
      { name: "WhatsApp Business API", icon: SiWhatsapp, color: "#25D366" },
      { name: "PayPal", icon: SiPaypal, color: "#00457C" },
      { name: "Paytm", icon: SiPaytm, color: "#00BAF2" },
      { name: "PhonePe", icon: SiPhonepe, color: "#5F259F" },
    ],
  },
  ai: {
    title: "AI-Assisted Development",
    description: "Agentic coding, spec-driven workflows, subagents & hooks",
    items: [
      { name: "Claude Code", icon: SiClaude, color: "#D97757" },
    ],
  },
}

// Placeholder projects — swap these out with real work. Each card falls back
// to a generated category banner when `image` is null, and hides the
// Code/Live Demo buttons when `github`/`demo` are null, so filling in real
// values later is enough to light everything up automatically.
export const projects = [
  {
    id: 1,
    title: "Full-Stack Web Application",
    description: "A production-style full-stack app with a React front end, REST API back end and a relational data layer — replace with a real project and its live details.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    category: "Full-Stack",
    featured: true,
    github: null,
    demo: null,
    image: null
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Product catalog, cart and checkout flow built end to end, from schema design through to a responsive storefront UI.",
    technologies: ["React.js", "Node.js", "MySQL", "Tailwind CSS"],
    category: "E-Commerce",
    featured: true,
    github: null,
    demo: null,
    image: null
  },
  {
    id: 3,
    title: "Real-Time Chat & Video App",
    description: "Peer-to-peer video and messaging with real-time presence, built on WebRTC and WebSockets for low-latency communication.",
    technologies: ["React.js", "WebRTC", "Socket.io", "Express.js"],
    category: "Real-Time",
    featured: false,
    github: null,
    demo: null,
    image: null
  },
  {
    id: 4,
    title: "REST API & Backend Service",
    description: "A documented REST API with authentication, role-based access control and containerized deployment.",
    technologies: ["Node.js", "Express.js", "MySQL", "Docker"],
    category: "Backend",
    featured: false,
    github: null,
    demo: null,
    image: null
  },
  {
    id: 5,
    title: "Admin Dashboard",
    description: "A role-based admin panel with data tables, search and reporting views for managing day-to-day operations.",
    technologies: ["React.js", "Redux", "Tailwind CSS", "REST API"],
    category: "Frontend",
    featured: false,
    github: null,
    demo: null,
    image: null
  },
  {
    id: 6,
    title: "Blockchain Credits Platform",
    description: "An ERC-20 credit-based platform with role-based interfaces for requesting, scheduling and tracking services.",
    technologies: ["React.js", "Node.js", "MongoDB", "Solidity"],
    category: "Full-Stack",
    featured: false,
    github: null,
    demo: null,
    image: null
  }
]
