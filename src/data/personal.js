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
  frontend: [
    { name: "HTML5", level: 95, category: "Frontend", icon: "🌐" },
    { name: "CSS3", level: 90, category: "Frontend", icon: "🎨" },
    { name: "Tailwind CSS", level: 95, category: "Frontend", icon: "💨" },
    { name: "JavaScript (ES6+)", level: 95, category: "Frontend", icon: "⚡" },
    { name: "React.js", level: 90, category: "Frontend", icon: "⚛️" },
    { name: "Redux", level: 85, category: "Frontend", icon: "🔄" }
  ],
  backend: [
    { name: "Node.js", level: 90, category: "Backend", icon: "🟢" },
    { name: "Express.js", level: 90, category: "Backend", icon: "🚀" },
    { name: "REST APIs", level: 95, category: "Backend", icon: "🔗" },
    { name: "MVC Architecture", level: 85, category: "Backend", icon: "🏗️" }
  ],
  database: [
    { name: "SQL", level: 90, category: "Database", icon: "📊" },
    { name: "MySQL", level: 90, category: "Database", icon: "🐬" },
    { name: "MongoDB", level: 85, category: "Database", icon: "🍃" },
    { name: "PL/SQL (Oracle)", level: 80, category: "Database", icon: "🔶" }
  ],
  cloud: [
    { name: "AWS EC2", level: 75, category: "Cloud", icon: "☁️" },
    { name: "Firewalls", level: 80, category: "Cloud", icon: "🔥" },
    { name: "VPN", level: 75, category: "Cloud", icon: "🔒" },
    { name: "Network Switches", level: 75, category: "Cloud", icon: "🔌" }
  ],
  tools: [
    { name: "Git", level: 95, category: "Tools", icon: "📝" },
    { name: "GitHub", level: 95, category: "Tools", icon: "🐙" },
    { name: "Linux", level: 80, category: "Tools", icon: "🐧" },
    { name: "Debugging", level: 90, category: "Tools", icon: "🐛" },
    { name: "Problem Solving", level: 95, category: "Tools", icon: "🧩" }
  ]
}

export const projects = [
  {
    id: 1,
    title: "Real-Time Video Chat Application",
    description: "Built a comprehensive video chat application with peer-to-peer communication using WebRTC technology. Features include real-time video/audio streaming, screen sharing, and chat messaging.",
    technologies: ["React.js", "Node.js", "WebRTC", "Socket.io", "Express.js"],
    category: "Full-Stack",
    featured: true,
    image: "/projects/video-chat.jpg"
  },
  {
    id: 2,
    title: "Customer Management System",
    description: "Developed a scalable customer management system supporting 10,000+ records with optimized database design and efficient query performance.",
    technologies: ["React.js", "Node.js", "MySQL", "Express.js", "REST API"],
    category: "Full-Stack",
    featured: true,
    image: "/projects/cms.jpg"
  },
  {
    id: 3,
    title: "Real-Time System Monitor",
    description: "Created asynchronous services for real-time system monitoring with automated alerts and comprehensive logging capabilities.",
    technologies: ["Node.js", "Express.js", "MongoDB", "WebSockets"],
    category: "Backend",
    featured: false,
    image: "/projects/monitor.jpg"
  }
]
