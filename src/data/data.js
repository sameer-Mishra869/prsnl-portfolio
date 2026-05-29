// ============================================
// Portfolio Data - Edit this file to update your portfolio content
// ============================================

export const personalInfo = {
  name: "Sameer",
  title: "Aspiring Full Stack Developer",
  tagline: "First-year B.Tech student passionate about building web experiences and solving real-world problems through code.",
  email: "sameer@gmail.com",
  phone: "+91 98765 43210",
  location: "India",
  university: "ITM SKILLS UNIVERSITY",
  year: "1st Year",
  availability: "Open to Internships & Collaborations",
  resumeLink: "#",
  socialLinks: {
    github: "https://github.com/sameer-Mishra869",
    linkedin: "https://www.linkedin.com/in/sameer-mishra-944814340",
  },
};

export const aboutText = `I'm a first-year B.Tech student with a passion for technology and web development. I love turning ideas into interactive digital experiences using modern technologies. Currently diving deep into React, JavaScript, and full-stack development while building projects that solve real problems. When I'm not coding, you'll find me exploring new tech, contributing to open source, or participating in hackathons.`;

export const skills = [
  {
    category: "Frontend",
    icon: "frontend",
    items: [
      { name: "HTML5", level: 85 },
      { name: "CSS3", level: 80 },
      { name: "JavaScript", level: 75 },
      { name: "React JS", level: 65 },
      { name: "Tailwind CSS", level: 60 },
    ],
  },
  {
    category: "Backend & Languages",
    icon: "backend",
    items: [
      { name: "C / C++", level: 70 },
      { name: "Python", level: 65 },
      { name: "Java", level: 55 },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "tools",
    items: [
      { name: "Git & GitHub", level: 70 },
      { name: "VS Code", level: 85 },
      { name: "Vercel", level: 55 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Bank Loan Eligibility Predictor",
    description:
      "A data-driven project that predicts bank loan eligibility using machine learning techniques and data analysis.",
    image: null,
    tags: ["Python", "ML", "Data Science"],
    category: "ML / Data",
    github: "https://github.com/sameer-Mishra869/Bank-loan-eligibility-project",
    live: null,
    featured: true,
  },
  {
    id: 2,
    title: "Time Travel Puzzle Game",
    description:
      "An interactive puzzle game with a time-travel theme featuring engaging gameplay mechanics and creative level design.",
    image: null,
    tags: ["JavaScript", "HTML", "CSS", "Game Dev"],
    category: "Web App",
    github: "https://github.com/sameer-Mishra869/time-travel-puzzle-game",
    live: null,
    featured: true,
  },
  {
    id: 3,
    title: "C++ Mini Project",
    description:
      "A console-based C++ application demonstrating object-oriented programming, file handling, and data management skills.",
    image: null,
    tags: ["C++", "OOP", "File I/O"],
    category: "CLI Tool",
    github: "https://github.com/sameer-Mishra869/cpp_mini_project",
    live: null,
    featured: false,
  },
  {
    id: 4,
    title: "JavaScript Hello World",
    description:
      "A beginner-friendly JavaScript project exploring fundamentals of the language with hands-on coding examples.",
    image: null,
    tags: ["JavaScript", "HTML", "CSS"],
    category: "Web App",
    github: "https://github.com/sameer-Mishra869/javascript-hello-world-",
    live: null,
    featured: true,
  },
  {
    id: 5,
    title: "Python Lab",
    description:
      "A comprehensive collection of Python laboratory experiments, exercises, and algorithm implementations.",
    image: null,
    tags: ["Python", "Algorithms", "Lab"],
    category: "Programming",
    github: "https://github.com/sameer-Mishra869/python-lab",
    live: null,
    featured: true,
  },
  {
    id: 6,
    title: "HTML CSS Grid",
    description:
      "Responsive layout showcase demonstrating advanced CSS Grid and Flexbox techniques for modern web interfaces.",
    image: null,
    tags: ["HTML", "CSS", "CSS Grid", "Flexbox"],
    category: "Web Design",
    github: "https://github.com/sameer-Mishra869/html-css-grid",
    live: null,
    featured: true,
  },
];

export const education = [
  {
    id: 1,
    title: "B.Tech in Computer Science",
    organization: "ITM SKILLS UNIVERSITY",
    period: "2025 – Present",
    description:
      "Currently in first year, studying Data Structures, Algorithms, OOP, and Web Development. Active member of the coding club.",
    current: true,
  },
  {
    id: 2,
    type: "education",
    title: "Higher Secondary (12th Grade)",
    organization: "ST. MARRY",
    period: "2023 – 2025",
    description:
      "Completed with focus on PCMB (Physics, Chemistry, Mathematics, Biology). Scored 79% in board exams.",
    current: false,
  },
];

export const achievements = [
  {
    id: 1,
    title: "Hackathon Participant",
    organization: "College Tech Fest",
    period: "2025",
    description:
      "Participated in a 24-hour hackathon and built a working prototype for a campus navigation app.",
    current: false,
  },
  {
    id: 2,
    title: "Python for Everybody Specialization",
    organization: "Coursera & University of Michigan",
    period: "2025",
    description:
      "Completed a five-course comprehensive specialization covering Python data structures, web databases, scraping, and data analysis.",
    current: false,
    hasCertificate: true,
    certificate: {
      type: "coursera",
      recipient: "Sameer Mishra",
      course: "Python for Everybody Specialization",
      organization: "Coursera",
      partner: "University of Michigan",
      date: "April 18, 2025",
      credentialId: "coursera-869-sameer-py",
      verifyUrl: "https://www.coursera.org/verify/specialization/sameer-mishra"
    }
  },
  {
    id: 3,
    title: "Responsive Web Design Certification",
    organization: "freeCodeCamp",
    period: "2025",
    description:
      "Earned professional certification covering HTML5, CSS3, Flexbox, CSS Grid, and responsive web design best practices.",
    current: false,
    hasCertificate: true,
    certificate: {
      type: "freecodecamp",
      recipient: "Sameer Mishra",
      course: "Responsive Web Design Certification",
      organization: "freeCodeCamp",
      date: "June 5, 2025",
      credentialId: "fcc869-sameer-mishra-rwd",
      verifyUrl: "https://www.freecodecamp.org/certification/sameer-Mishra869/responsive-web-design"
    }
  },
  {
    id: 4,
    title: "100+ Coding Problems Solved",
    organization: "LeetCode & HackerRank",
    period: "2025",
    description:
      "Actively practicing data structures and algorithms, solving over 100 challenges across multiple programming languages.",
    current: true,
    hasCertificate: true,
    certificate: {
      type: "leetcode",
      recipient: "Sameer Mishra",
      course: "100+ Algorithms Solved Badge",
      organization: "LeetCode Proficiency",
      date: "August 10, 2025",
      credentialId: "lc-sameer-dsa-100",
      verifyUrl: "https://leetcode.com/accounts/signup/"
    }
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
