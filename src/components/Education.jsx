import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { education } from "../data/data";

const fadeUp = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
};

export default function Education() {
  const containerRef = useRef(null);

  // Track scroll progress of this container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth the scroll value
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Map scroll value to top percentage for the traveling ball
  const ballY = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <section id="education">
      <div className="container">
        <motion.div 
          className="section-header" 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">My Academics</p>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My academic foundations and learning milestones</p>
        </motion.div>
        
        <div className="timeline" ref={containerRef}>
          {/* Scrolling progress line */}
          <motion.div 
            className="timeline-progress-line"
            style={{
              position: "absolute",
              left: "24px",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(180deg, var(--accent), var(--accent-light))",
              transformOrigin: "top",
              scaleY,
              zIndex: 1,
            }}
          />

          {/* Traveling ball */}
          <motion.div 
            className="timeline-progress-ball"
            style={{
              position: "absolute",
              left: "16px", // Centered over 24px (left 24px - 8px radius offset = 16px)
              top: ballY,
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "var(--accent)",
              border: "3px solid var(--bg-secondary)",
              boxShadow: "0 0 12px var(--accent), 0 0 20px var(--accent-light)",
              y: "-50%",
              zIndex: 2,
            }}
          />

          {education.map((item, i) => (
            <motion.div 
              className="timeline-item" 
              key={item.id} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-40px" }} 
              variants={fadeUp} 
              custom={i}
            >
              {/* Timeline marker node */}
              <div className={`timeline-dot${item.current ? " current" : ""}`} />
              <div className="timeline-content">
                <span className="timeline-badge">Academic</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-org">{item.organization}</p>
                <p className="timeline-period">{item.period}</p>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
