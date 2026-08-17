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
  title: "Full-Stack Web Developer",
  location: "Ottawa, ON, Canada",
  phone: "+1 (613) 866 2971",
  email: "pargatttsinghhh@gmail.com",
  website: "pargatfolio.com",
  github: "github.com/pargat-apps",
  githubUsername: "pargat-apps",
  linkedin: "linkedin.com/in/pargat1204",

  bio: "Full-Stack Software Developer with 2+ years of professional experience building and shipping production web applications end to end. Strong in JavaScript, React.js, Node.js and Express.js, with hands-on experience designing REST APIs, modelling MySQL and MongoDB schemas, integrating third-party services, and deploying to AWS EC2 on Linux. Currently completing a Post-Graduate Diploma in Full Stack Software Development at Lambton College, Ottawa.",

  funFact: "Beyond shipping production code, I mentor other developers as a Peer Tutor at Lambton College, coaching students through JavaScript, React, Node.js/Express, MongoDB, Git/GitHub, CI/CD, containerization and cloud deployment toward independent debugging.",

  tagline: "Building the future, one line of code at a time",

  heroDescription: "I build production web applications end to end — from REST APIs and database schemas to polished React interfaces — using JavaScript, React.js, Node.js and Express.js.",
  
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
    role: "Post-Graduate Diploma, Full Stack Software Development",
    location: "Ottawa, ON, Canada",
    duration: "Sep 2024 – June 2026",
    type: "Education",
    description: "Two-year postgraduate diploma in full-stack development, covering modern web technologies, cloud platforms and industry-standard development practices.",
    achievements: [
      "Worked as a Peer Tutor for DevOps and Full Stack JavaScript (Co-op Term, 2026), tutoring JavaScript, React, Node.js/Express, MongoDB, Git/GitHub, CI/CD, containerization and cloud deployment, and coaching students toward independent debugging."
    ],
    technologies: ["JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "Git", "GitHub", "CI/CD", "Docker"]
  },
  {
    id: 2,
    company: "Mozo Cloud Services Pvt. Ltd.",
    role: "Full-Stack Web Developer",
    location: "Chandigarh, India",
    duration: "2021 – 2023",
    type: "Full-time",
    description: "Full-stack development role building and shipping production web applications end to end for enterprise clients.",
    achievements: [
      "Built and shipped production full-stack applications using React.js, Node.js, Express.js and MySQL, including real estate listing platforms, custom admin panels and role-based dashboards.",
      "Designed normalized MySQL schemas for a CRM holding 10,000+ customer records, cutting reporting and search response times through targeted indexing and query optimization.",
      "Developed real-time video streaming and click-to-call features with WebRTC and WebSockets, integrating Tata Tele telephony APIs to route inbound customers to available agents.",
      "Integrated Meta Graph API and WhatsApp Business API for marketing campaigns and automated lead capture, and built PayPal, Paytm and PhonePe payment flows with webhook confirmation.",
      "Deployed and maintained applications on AWS EC2 (Linux) using Git/GitHub workflows, and resolved production defects reported by client teams."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MySQL", "AWS EC2", "WebRTC", "WebSockets", "Git", "GitHub"]
  },
  {
    id: 3,
    company: "Shareware Infotech",
    role: "Front-End Developer",
    location: "India",
    duration: "2020 – 2021",
    type: "Full-time",
    description: "Front-end development role building responsive, cross-browser interfaces from design mockups.",
    achievements: [
      "Built responsive, cross-browser interfaces with HTML5, CSS3, JavaScript and React.js, converting design mockups into reusable components with state handling and form validation.",
      "Integrated REST APIs with asynchronous data fetching and explicit loading and error states, and debugged compatibility issues across browsers and screen sizes."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React.js", "REST APIs"]
  },
  {
    id: 4,
    company: "Guru Nanak Dev Engineering College",
    role: "B.Tech, Electronics and Communication Engineering",
    location: "Ludhiana, Punjab, India",
    duration: "2019",
    type: "Education",
    description: "Four-year Bachelor's degree in Electronics and Communication Engineering.",
    achievements: [],
    technologies: []
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
