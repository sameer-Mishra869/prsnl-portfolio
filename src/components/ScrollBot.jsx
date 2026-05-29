import React, { useEffect, useState } from 'react';

export default function ScrollBot() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className={`scroll-helper-widget ${isHovered ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={scrollToContact}
      aria-label="Connect with me"
    >
      <div className="progress-ring-container">
        <svg className="progress-ring" width="52" height="52">
          <circle
            className="progress-ring-bg"
            stroke="var(--border)"
            strokeWidth="3"
            fill="transparent"
            r="22"
            cx="26"
            cy="26"
          />
          <circle
            className="progress-ring-bar"
            stroke="var(--accent)"
            strokeWidth="3"
            fill="transparent"
            r="22"
            cx="26"
            cy="26"
            strokeDasharray={2 * Math.PI * 22}
            strokeDashoffset={2 * Math.PI * 22 - (scrollProgress / 100) * (2 * Math.PI * 22)}
          />
        </svg>
        <div className="widget-center-icon">
          ✨
        </div>
      </div>
      
      <div className="widget-message-bubble">
        <span className="widget-greeting">Let's connect! 👋</span>
      </div>
      
      <style>{`
        .scroll-helper-widget {
          position: fixed;
          bottom: 32px;
          right: 32px;
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 6px;
          box-shadow: var(--shadow-lg);
          cursor: pointer;
          z-index: 1000;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          max-width: 64px;
          white-space: nowrap;
          user-select: none;
        }
        
        .scroll-helper-widget:hover {
          max-width: 220px;
          border-color: var(--accent);
          transform: translateY(-4px);
          padding-right: 20px;
          box-shadow: 0 12px 30px rgba(224, 126, 89, 0.15);
        }
        
        .progress-ring-container {
          position: relative;
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .progress-ring {
          transform: rotate(-90deg);
          position: absolute;
          top: 0;
          left: 0;
        }
        
        .progress-ring-bg {
          opacity: 0.4;
        }
        
        .progress-ring-bar {
          transition: stroke-dashoffset 0.08s ease-out;
          stroke-linecap: round;
        }
        
        .widget-center-icon {
          font-size: 1.15rem;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .scroll-helper-widget:hover .widget-center-icon {
          transform: scale(1.15) rotate(15deg);
        }
        
        .widget-message-bubble {
          margin-left: 12px;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .scroll-helper-widget:hover .widget-message-bubble {
          opacity: 1;
          transform: translateX(0);
        }
        
        .widget-greeting {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.2px;
        }
        
        @media (max-width: 768px) {
          .scroll-helper-widget {
            bottom: 24px;
            right: 24px;
          }
          .scroll-helper-widget:hover {
            max-width: 64px;
            padding-right: 6px;
          }
          .widget-message-bubble {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
