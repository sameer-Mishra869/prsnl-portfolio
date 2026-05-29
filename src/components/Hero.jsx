import { motion } from "framer-motion";
import { personalInfo } from "../data/data";
import { FiArrowDown } from "react-icons/fi";

function HeroIllustration() {
  return (
    <svg viewBox="0 0 500 500" className="hero-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blob-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-light)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      
      {/* Organic, smooth humanist background blob */}
      <path 
        d="M410,240 C410,340 330,410 240,410 C150,410 90,320 90,220 C90,120 160,90 260,90 C360,90 410,140 410,240 Z" 
        fill="url(#blob-grad)"
        className="floating-blob"
      />
      
      {/* Code window / editor mockup */}
      <g transform="translate(100, 140)" className="window-float">
        {/* Soft drop shadow */}
        <rect x="8" y="12" width="290" height="190" rx="20" fill="rgba(42, 36, 33, 0.08)" filter="blur(8px)" />
        {/* Editor Container */}
        <rect x="0" y="0" width="290" height="190" rx="20" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="2" />
        {/* Editor Top Bar */}
        <path d="M0,24 L290,24" stroke="var(--border)" strokeWidth="1.5" />
        {/* Window controls */}
        <circle cx="20" cy="12" r="5" fill="#e06e3f" />
        <circle cx="36" cy="12" r="5" fill="#e6a15c" />
        <circle cx="52" cy="12" r="5" fill="#8da080" />
        
        {/* Coding details inside the screen */}
        <g transform="translate(24, 40)">
          {/* Tag */}
          <rect x="0" y="4" width="75" height="10" rx="5" fill="var(--accent)" opacity="0.85" className="code-tag-1" />
          <rect x="85" y="4" width="120" height="10" rx="5" fill="var(--text-muted)" opacity="0.2" />
          
          {/* Nested code */}
          <rect x="15" y="24" width="45" height="10" rx="5" fill="var(--accent-2)" opacity="0.85" className="code-tag-2" />
          <rect x="68" y="24" width="90" height="10" rx="5" fill="var(--text-muted)" opacity="0.2" />
          
          {/* Main function */}
          <rect x="30" y="44" width="130" height="10" rx="5" fill="var(--accent)" opacity="0.7" />
          <rect x="168" y="44" width="30" height="10" rx="5" fill="var(--accent-2)" opacity="0.6" />
          
          {/* Output line */}
          <rect x="30" y="64" width="80" height="10" rx="5" fill="var(--text-muted)" opacity="0.2" />
          <rect x="118" y="64" width="55" height="10" rx="5" fill="var(--accent)" opacity="0.8" />
          
          {/* Return statement */}
          <rect x="15" y="84" width="95" height="10" rx="5" fill="var(--accent-2)" opacity="0.85" />
          <rect x="118" y="84" width="45" height="10" rx="5" fill="var(--text-muted)" opacity="0.2" />
          
          {/* Closing tag */}
          <rect x="0" y="104" width="140" height="10" rx="5" fill="var(--accent)" opacity="0.8" />
        </g>
      </g>
      
      {/* Potted desk plant */}
      <g transform="translate(360, 270)" className="plant-sway">
        {/* Terracotta pot */}
        <path d="M8,45 L32,45 L38,16 L2,16 Z" fill="#d36b46" opacity="0.9" />
        {/* Soft soil */}
        <ellipse cx="20" cy="16" rx="18" ry="4" fill="#60524c" />
        {/* Dynamic organic leaves */}
        <path d="M20,16 Q10,-10 -5,-15 Q15,-5 20,16" fill="#8da080" />
        <path d="M20,16 Q28,-18 42,-22 Q32,-2 20,16" fill="#7b916d" />
        <path d="M20,16 Q35,5 45,-2 Q30,12 20,16" fill="#a4b59c" />
      </g>

      {/* Floating tech stack visual badges */}
      <g transform="translate(60, 280)" className="js-badge-float">
        <rect x="0" y="0" width="50" height="50" rx="16" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="2" />
        <text x="25" y="31" fontSize="15" fontWeight="800" fontFamily="var(--font)" fill="var(--accent)" textAnchor="middle">JS</text>
      </g>
      
      <g transform="translate(330, 90)" className="react-badge-float">
        <rect x="0" y="0" width="50" height="50" rx="16" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="2" />
        <text x="25" y="33" fontSize="22" fontWeight="800" fill="var(--accent-2)" textAnchor="middle">⚛</text>
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="hero-greeting">👋 Hey there, I'm</p>
            <h1 className="hero-name">
              {personalInfo.name}<span className="accent">.</span>
            </h1>
            <p className="hero-title">{personalInfo.title}</p>
            <p className="hero-desc">{personalInfo.tagline}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">
                <FiArrowDown /> View My Work
              </a>
              <a href="#contact" className="btn-secondary">
                Contact Me
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1st</div>
                <div className="stat-label">Year BTech</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">Curiosity</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
