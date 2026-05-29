import { motion } from "framer-motion";
import { personalInfo, aboutText } from "../data/data";
import { FiMapPin, FiBookOpen, FiCalendar, FiBriefcase } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const facts = [
  { icon: <FiMapPin />, label: "Location", value: personalInfo.location },
  { icon: <FiBookOpen />, label: "Education", value: personalInfo.university },
  { icon: <FiCalendar />, label: "Year", value: personalInfo.year },
  { icon: <FiBriefcase />, label: "Status", value: personalInfo.availability },
];

function AboutIllustration() {
  return (
    <svg viewBox="0 0 500 500" className="about-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blob-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      
      {/* Background shape */}
      <path 
        d="M420,230 C420,330 350,400 250,400 C150,400 100,310 100,210 C100,110 170,80 270,80 C370,80 420,130 420,230 Z" 
        fill="url(#blob-grad-2)"
        className="floating-blob-delayed"
      />
      
      {/* Central workspace / tech stack graphics */}
      <g transform="translate(110, 110)" className="about-graphics-float">
        
        {/* Connection paths */}
        <path d="M70,180 C110,185 110,105 130,55" fill="none" stroke="var(--border)" strokeWidth="2.5" strokeDasharray="6 6" />
        <path d="M180,95 L180,145" fill="none" stroke="var(--border)" strokeWidth="2.5" strokeDasharray="6 6" />
        <path d="M200,55 C230,105 230,185 270,180" fill="none" stroke="var(--border)" strokeWidth="2.5" strokeDasharray="6 6" />

        {/* Database Node */}
        <g transform="translate(20, 130)">
          <rect x="-8" y="-8" width="86" height="96" rx="20" fill="rgba(42, 36, 33, 0.04)" filter="blur(6px)" />
          <rect x="0" y="0" width="70" height="80" rx="16" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="2" />
          <ellipse cx="35" cy="22" rx="22" ry="7" fill="var(--accent-glow)" stroke="var(--accent)" strokeWidth="2" />
          <path d="M13,22 L13,40 A22,7 0 0,0 57,40 L57,22" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <path d="M13,40 L13,58 A22,7 0 0,0 57,58 L57,40" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 3" />
          <text x="35" y="74" fontSize="9" fontWeight="800" fill="var(--text-muted)" textAnchor="middle" letterSpacing="0.5">DATA</text>
        </g>

        {/* Frontend Web node */}
        <g transform="translate(120, 15)">
          <rect x="-8" y="-8" width="126" height="96" rx="22" fill="rgba(42, 36, 33, 0.04)" filter="blur(6px)" />
          <rect x="0" y="0" width="110" height="80" rx="18" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="2" />
          <rect x="8" y="8" width="94" height="46" rx="10" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="1" />
          {/* Controls */}
          <circle cx="20" cy="65" r="4" fill="var(--accent-2)" />
          <rect x="30" y="63" width="35" height="4" rx="2" fill="var(--text-muted)" opacity="0.4" />
          <text x="55" y="34" fontSize="10" fontWeight="800" fill="var(--accent)" textAnchor="middle" letterSpacing="0.5">UI / UX</text>
        </g>

        {/* Cloud / API node */}
        <g transform="translate(200, 130)">
          <rect x="-8" y="-8" width="86" height="96" rx="20" fill="rgba(42, 36, 33, 0.04)" filter="blur(6px)" />
          <rect x="0" y="0" width="70" height="80" rx="16" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="2" />
          <path d="M22,46 A9,9 0 0,1 22,28 A11,11 0 0,1 42,25 A9,9 0 0,1 52,36 A9,9 0 0,1 48,46 Z" fill="var(--accent-glow)" stroke="var(--accent-2)" strokeWidth="2" />
          <text x="35" y="68" fontSize="9" fontWeight="800" fill="var(--text-muted)" textAnchor="middle" letterSpacing="0.5">CLOUD</text>
        </g>
      </g>
    </svg>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}>
          <p className="section-label">About Me</p>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle">A curious learner who loves turning ideas into code</p>
        </motion.div>
        <div className="about-grid">
          <motion.div className="about-image" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <div className="about-image-wrapper" style={{ border: 'none', background: 'transparent' }}>
              <AboutIllustration />
            </div>
          </motion.div>
          <motion.div className="about-text" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
            <p>{aboutText}</p>
            <div className="about-facts">
              {facts.map((fact, i) => (
                <motion.div className="fact-card" key={i} variants={fadeUp} custom={i + 3}>
                  <div className="fact-icon">{fact.icon}</div>
                  <div>
                    <div className="fact-label">{fact.label}</div>
                    <div className="fact-value">{fact.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
