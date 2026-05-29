import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/data";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.1, duration: 0.4 } }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const projectSnippets = {
  1: `import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)`,
  2: `function timeTravel(year) {\n  gameState.current = year;\n  renderLevel(year);\n  checkWinCondition();\n}`,
  3: `class Student {\nprivate:\n  string name;\n  int roll;\npublic:\n  void saveToFile();\n};`,
  4: `const greet = () => {\n  console.log("Hello World!");\n  document.body.append('🚀');\n};`,
  5: `import { motion } from "framer-motion";\nexport const Hero = () => (\n  <motion.div animate={{y:0}} />\n);`,
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="section-label">My Work</p>
          <h2 className="section-title">Projects I've Built</h2>
          <p className="section-subtitle">From class assignments to passion projects — here's what I've been making</p>
        </motion.div>
        <div className="project-filters">
          {categories.map((cat) => (
            <button key={cat} className={`filter-btn${filter === cat ? " active" : ""}`} onClick={() => setFilter(cat)}>
              {cat}
            </button>
          ))}
        </div>
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div className="project-card" key={project.id} variants={cardVariants} initial="hidden" animate="visible" exit="exit" custom={i} layout>
                <div className="project-card-image">
                  <pre className="project-code-snippet">
                    <code>{projectSnippets[project.id] || "// Code loading..."}</code>
                  </pre>
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="project-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                        <FiGithub /> Code
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="project-link">
                        <FiExternalLink /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
