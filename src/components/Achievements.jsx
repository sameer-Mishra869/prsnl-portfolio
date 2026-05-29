import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { achievements } from "../data/data";
import { FiAward, FiX, FiExternalLink, FiCheckCircle } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
};

export default function Achievements() {
  const containerRef = useRef(null);
  const [activeCert, setActiveCert] = useState(null);

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
    <section id="achievements">
      <div className="container">
        <motion.div 
          className="section-header" 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">My Accomplishments</p>
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">Key achievements, highlights, and certification journey</p>
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

          {achievements.map((item, i) => (
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
                <span className="timeline-badge">Achievement</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-org">{item.organization}</p>
                <p className="timeline-period">{item.period}</p>
                <p className="timeline-desc">{item.description}</p>
                
                {/* Certificate Action Button */}
                {item.hasCertificate && (
                  <button 
                    onClick={() => setActiveCert(item.certificate)}
                    className="cert-btn"
                    style={{
                      marginTop: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      color: "var(--accent)",
                      background: "var(--accent-glow)",
                      border: "1px solid rgba(224, 126, 89, 0.2)",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      transition: "all var(--transition)",
                      cursor: "pointer",
                    }}
                  >
                    <FiAward /> Show Certificate
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Digital Certificate Modal Overlay */}
      <AnimatePresence>
        {activeCert && (
          <motion.div 
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.82)",
              backdropFilter: "blur(14px)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div 
              className="cert-modal-card"
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "740px",
                borderRadius: "16px",
                boxShadow: "0 28px 70px rgba(0, 0, 0, 0.6)",
                overflow: "hidden",
              }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveCert(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(0,0,0,0.1)",
                  border: "none",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  transition: "0.2s all",
                  zIndex: 20,
                  color: activeCert.type === "leetcode" ? "#fff" : "#2e2724",
                }}
              >
                <FiX />
              </button>

              {/* 1. COURSERA & UNIVERSITY OF MICHIGAN CERTIFICATE LAYOUT */}
              {activeCert.type === "coursera" && (
                <div style={{
                  background: "#ffffff",
                  color: "#373a3c",
                  fontFamily: "var(--font)",
                  padding: "40px",
                  border: "1px solid #d3d3d3",
                  textAlign: "left",
                }}>
                  {/* Top Logos Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "36px" }}>
                    <div>
                      <span style={{ fontSize: "1.45rem", fontWeight: "800", color: "#0056d2", letterSpacing: "-0.5px" }}>
                        coursera
                      </span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: "800", letterSpacing: "1.5px", color: "#0f2038", textTransform: "uppercase" }}>
                        University of Michigan
                      </span>
                    </div>
                  </div>

                  {/* Cert Title Info */}
                  <div style={{ marginBottom: "28px" }}>
                    <p style={{ fontSize: "0.82rem", color: "#5a5f63", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 10px 0" }}>
                      {activeCert.date}
                    </p>
                    <h1 style={{ fontSize: "2.1rem", fontWeight: "700", color: "#0f2038", margin: "0 0 12px 0", lineHeight: "1.2" }}>
                      {activeCert.recipient}
                    </h1>
                    <p style={{ fontSize: "0.95rem", color: "#373a3c", margin: 0 }}>
                      has successfully completed the online, non-credit Specialization
                    </p>
                  </div>

                  {/* Specialization Details */}
                  <div style={{ background: "#f8f9fa", borderLeft: "4px solid #0056d2", padding: "20px", borderRadius: "4px", marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#0f2038", margin: "0 0 8px 0" }}>
                      {activeCert.course}
                    </h2>
                    <p style={{ fontSize: "0.82rem", color: "#5a5f63", lineHeight: "1.6", margin: 0 }}>
                      An online 5-course programming curriculum authorized by the University of Michigan and offered through Coursera, covering fundamental Python concepts, dictionary structures, web APIs, Databases, SQLite, and network data scraping.
                    </p>
                  </div>

                  {/* Signatures & Seal */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.2rem", color: "#373a3c", borderBottom: "1px solid #d3d3d3", width: "160px", paddingBottom: "6px", marginBottom: "4px" }}>
                        Charles Severance
                      </div>
                      <p style={{ fontSize: "0.68rem", color: "#5a5f63", margin: 0, textTransform: "uppercase", fontWeight: "700" }}>
                        Charles Severance ("Dr. Chuck")
                      </p>
                      <p style={{ fontSize: "0.62rem", color: "#5a5f63", margin: 0 }}>
                        Associate Professor, School of Information
                      </p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-block", background: "#f8f9fa", border: "1px solid #e9ecef", padding: "8px 16px", borderRadius: "6px" }}>
                        <p style={{ fontSize: "0.62rem", color: "#868e96", margin: "0 0 4px 0", textTransform: "uppercase", fontWeight: "700" }}>
                          Verify Credential
                        </p>
                        <a 
                          href={activeCert.verifyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "0.78rem",
                            color: "#0056d2",
                            fontWeight: "700",
                          }}
                        >
                          coursera.org/verify/specialization <FiExternalLink />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Credential validation footnote */}
                  <div style={{ borderTop: "1px solid #f1f3f5", marginTop: "32px", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "0.62rem", color: "#868e96" }}>
                    <span>Credential ID: {activeCert.credentialId}</span>
                    <span>Coursera has confirmed the identity of this individual and their participation.</span>
                  </div>
                </div>
              )}

              {/* 2. FREECODECAMP CERTIFICATE LAYOUT */}
              {activeCert.type === "freecodecamp" && (
                <div style={{
                  background: "linear-gradient(135deg, #fefdfa 0%, #f6f1e8 100%)",
                  color: "#2e2724",
                  fontFamily: "var(--font-serif)",
                  padding: "36px",
                  border: "8px double #cbb281",
                  outline: "1px solid #9c7b4c",
                  textAlign: "center",
                }}>
                  <div style={{ border: "2px solid #ded4c2", padding: "28px", borderRadius: "8px" }}>
                    
                    {/* Authority Header */}
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <FiAward style={{ fontSize: "2.4rem", color: "#cbb281" }} />
                      <span style={{ fontSize: "0.95rem", fontWeight: "800", letterSpacing: "4px", color: "#6c594c", fontFamily: "var(--font)" }}>
                        {activeCert.organization.toUpperCase()}
                      </span>
                    </div>

                    <h1 style={{ fontSize: "1.85rem", fontWeight: "700", margin: "10px 0 4px 0", color: "#2e2724" }}>
                      Certificate of Achievement
                    </h1>
                    <p style={{ fontSize: "0.82rem", fontStyle: "italic", color: "#8c796b", letterSpacing: "1px", margin: "0 auto 20px auto" }}>
                      THIS IS PROUDLY PRESENTED TO
                    </p>

                    {/* Recipient Name */}
                    <h2 style={{ 
                      fontSize: "2.8rem", 
                      fontWeight: "700", 
                      margin: "12px 0", 
                      color: "#b6522e", 
                      borderBottom: "2px solid #e07e59", 
                      display: "inline-block", 
                      paddingBottom: "6px", 
                      minWidth: "280px" 
                    }}>
                      {activeCert.recipient}
                    </h2>

                    {/* Course Completion Details */}
                    <p style={{ fontSize: "0.92rem", color: "#5c4b40", lineHeight: "1.6", maxWidth: "500px", margin: "14px auto 24px auto" }}>
                      for successfully demonstrating professional proficiency and fulfilling all requirements to be certified in <br />
                      <strong style={{ color: "#2e2724", fontSize: "1.08rem", display: "block", marginTop: "6px", fontWeight: "700" }}>
                        {activeCert.course}
                      </strong>
                    </p>

                    {/* Bottom signatures and seal row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "28px", flexWrap: "wrap", gap: "20px" }}>
                      
                      {/* Left Signature */}
                      <div style={{ textAlign: "center", flex: "1" }}>
                        <div style={{ 
                          fontStyle: "italic",
                          fontSize: "1.25rem", 
                          color: "#6c594c", 
                          borderBottom: "1px solid #dcd3c3", 
                          width: "140px", 
                          margin: "0 auto 5px auto", 
                          paddingBottom: "5px" 
                        }}>
                          Quincy Larson
                        </div>
                        <p style={{ fontSize: "0.68rem", color: "#8c796b", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", fontFamily: "var(--font)" }}>
                          Executive Director
                        </p>
                      </div>

                      {/* Gold seal */}
                      <div style={{ position: "relative", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ 
                          position: "absolute", 
                          width: "74px", 
                          height: "74px", 
                          borderRadius: "50%", 
                          background: "radial-gradient(circle, #f3d79e 0%, #b8934c 100%)", 
                          boxShadow: "0 4px 12px rgba(184, 147, 76, 0.35)", 
                          transform: "rotate(45deg)" 
                        }} />
                        <div style={{ 
                          position: "absolute", 
                          width: "64px", 
                          height: "64px", 
                          borderRadius: "50%", 
                          border: "2px dashed #efe7db", 
                          display: "flex", 
                          flexDirection: "column", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          color: "#fff", 
                          zIndex: 1 
                        }}>
                          <span style={{ fontSize: "0.55rem", fontWeight: "800", letterSpacing: "1px" }}>OFFICIAL</span>
                          <FiCheckCircle style={{ fontSize: "0.95rem", margin: "2px 0" }} />
                          <span style={{ fontSize: "0.50rem", fontWeight: "800", letterSpacing: "1px" }}>VERIFIED</span>
                        </div>
                      </div>

                      {/* Right Signature/Date */}
                      <div style={{ textAlign: "center", flex: "1" }}>
                        <div style={{ 
                          fontSize: "0.92rem", 
                          fontWeight: "700", 
                          color: "#6c594c", 
                          borderBottom: "1px solid #dcd3c3", 
                          width: "140px", 
                          margin: "0 auto 5px auto", 
                          paddingBottom: "5px" 
                        }}>
                          {activeCert.date}
                        </div>
                        <p style={{ fontSize: "0.68rem", color: "#8c796b", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", fontFamily: "var(--font)" }}>
                          Date Issued
                        </p>
                      </div>

                    </div>

                    {/* Footer Validation block */}
                    <div style={{ marginTop: "32px", borderTop: "1px solid #efe7db", paddingTop: "18px", fontFamily: "var(--font)" }}>
                      <p style={{ fontSize: "0.68rem", color: "#8c796b", marginBottom: "10px", fontWeight: "500" }}>
                        CREDENTIAL ID: <code style={{ background: "#efeae0", padding: "3px 8px", borderRadius: "4px", color: "#5c4b40" }}>{activeCert.credentialId}</code>
                      </p>
                      <a 
                        href={activeCert.verifyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "0.8rem",
                          fontWeight: "700",
                          color: "#fff",
                          background: "#6c594c",
                          padding: "10px 22px",
                          borderRadius: "6px",
                          transition: "0.2s all",
                          boxShadow: "0 4px 10px rgba(108, 89, 76, 0.2)",
                        }}
                        className="cert-verify-btn"
                      >
                        Verify Official Certificate <FiExternalLink />
                      </a>
                    </div>

                  </div>
                </div>
              )}

              {/* 3. LEETCODE ALGORITHMIC CERTIFICATE LAYOUT */}
              {activeCert.type === "leetcode" && (
                <div style={{
                  background: "linear-gradient(135deg, #1e1e1e 0%, #0d0d0d 100%)",
                  color: "#e0e0e0",
                  fontFamily: "var(--font)",
                  padding: "40px",
                  border: "2px solid #ffa116",
                  boxShadow: "inset 0 0 20px rgba(255, 161, 22, 0.15)",
                  textAlign: "center",
                }}>
                  
                  {/* Cyberpunk grid header */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                    <span style={{ fontSize: "1.6rem", fontWeight: "900", color: "#ffa116", letterSpacing: "1px" }}>
                      LeetCode
                    </span>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffa116" }} />
                    <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#a6978f", letterSpacing: "3px", textTransform: "uppercase" }}>
                      Coding Elite
                    </span>
                  </div>

                  <h1 style={{ 
                    fontSize: "2rem", 
                    fontWeight: "900", 
                    color: "#ffffff", 
                    margin: "0 0 8px 0", 
                    textTransform: "uppercase", 
                    letterSpacing: "2px",
                    background: "linear-gradient(90deg, #ffffff, #ffa116)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    Algorithmic Proficiency Badge
                  </h1>
                  <p style={{ fontSize: "0.78rem", color: "#a6978f", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "28px" }}>
                    AUTHENTICATED DATA STRUCTURES & ALGORITHMS COMPETENCY
                  </p>

                  {/* Recipient Frame */}
                  <div style={{ margin: "24px 0" }}>
                    <p style={{ fontSize: "0.8rem", color: "#ffa116", margin: "0 0 6px 0", textTransform: "uppercase", letterSpacing: "2px" }}>
                      AWARDED TO
                    </p>
                    <h2 style={{ fontSize: "2.6rem", fontWeight: "800", color: "#ffffff", margin: 0, letterSpacing: "-0.5px" }}>
                      {activeCert.recipient}
                    </h2>
                  </div>

                  {/* LeetCode stats showcase */}
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    gap: "28px", 
                    background: "rgba(255, 161, 22, 0.05)", 
                    border: "1px solid rgba(255, 161, 22, 0.2)",
                    padding: "16px 24px",
                    borderRadius: "10px",
                    maxWidth: "460px",
                    margin: "0 auto 32px auto",
                  }}>
                    {/* Glowing orange icon */}
                    <div style={{ 
                      width: "60px", 
                      height: "60px", 
                      borderRadius: "50%", 
                      background: "rgba(255, 161, 22, 0.15)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      border: "1px solid rgba(255, 161, 22, 0.4)",
                      boxShadow: "0 0 15px rgba(255, 161, 22, 0.2)",
                      fontSize: "1.7rem",
                      color: "#ffa116"
                    }}>
                      ⚡
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <h4 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#ffffff", margin: "0 0 2px 0" }}>
                        {activeCert.course}
                      </h4>
                      <p style={{ fontSize: "0.78rem", color: "#a6978f", margin: 0 }}>
                        Fulfilling advanced computational logic, active time complexity optimization, and recursive problem designs.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Stats Column */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px" }}>
                    
                    <div style={{ textAlign: "left" }}>
                      <span style={{ fontSize: "0.68rem", color: "#a6978f", textTransform: "uppercase", letterSpacing: "1px", display: "block" }}>
                        Credential ID
                      </span>
                      <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#ffa116" }}>
                        {activeCert.credentialId}
                      </span>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "0.68rem", color: "#a6978f", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "4px" }}>
                        Status
                      </span>
                      <span style={{ fontSize: "0.68rem", fontWeight: "800", background: "rgba(46, 204, 113, 0.15)", color: "#2ecc71", padding: "4px 10px", borderRadius: "20px", border: "1px solid rgba(46, 204, 113, 0.3)" }}>
                        ● VERIFIED PORTFOLIO
                      </span>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <a 
                        href={activeCert.verifyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "0.8rem",
                          fontWeight: "800",
                          color: "#0d0d0d",
                          background: "#ffa116",
                          padding: "10px 20px",
                          borderRadius: "6px",
                          transition: "0.2s all",
                          boxShadow: "0 4px 12px rgba(255, 161, 22, 0.3)",
                        }}
                        className="cert-verify-btn"
                      >
                        Inspect LeetCode Profile <FiExternalLink />
                      </a>
                    </div>

                  </div>

                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
