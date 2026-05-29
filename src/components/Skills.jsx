import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/data";
import { FiMonitor, FiServer, FiTool } from "react-icons/fi";

const iconMap = { frontend: <FiMonitor />, backend: <FiServer />, tools: <FiTool /> };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
};

function SkillBar({ level, inView }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar-fill" style={{ width: inView ? `${level}%` : "0%" }} />
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <p className="section-label">My Skills</p>
          <h2 className="section-title">What I Know</h2>
          <p className="section-subtitle">Technologies and tools I've been learning and working with</p>
        </motion.div>
        <div className="skills-grid">
          {skills.map((cat, idx) => (
            <motion.div className="skill-card" key={cat.category} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={idx + 1}>
              <div className="skill-card-header">
                <div className="skill-card-icon">{iconMap[cat.icon]}</div>
                <h3 className="skill-card-title">{cat.category}</h3>
              </div>
              {cat.items.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <SkillBar level={skill.level} inView={inView} />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
