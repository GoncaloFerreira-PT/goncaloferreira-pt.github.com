import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <h2>About Me</h2>
          <div className="tech-stack">
            <span className="tech-tag">React</span>
            <span className="tech-tag">Node.js</span>
            <span className="tech-tag">Three.js</span>
            <span className="tech-tag">Python</span>
            <span className="tech-tag">MongoDB</span>
          </div>
        </div>
        
        <div className="about-grid">
          <div className="about-card">
            <h3>🎯 Focus</h3>
            <p>Passionate about creating immersive web experiences and solving complex problems through elegant code solutions.</p>
          </div>
          
          <div className="about-card">
            <h3>💡 Expertise</h3>
            <p>Specialized in full-stack development with a strong focus on 3D web technologies and interactive user experiences.</p>
          </div>
          
          <div className="about-card">
            <h3>🚀 Journey</h3>
            <p>From backend systems to frontend animations, I love pushing the boundaries of what's possible on the web.</p>
          </div>
          
          <div className="about-card">
            <h3>🤝 Collaboration</h3>
            <p>Experienced in working with cross-functional teams and bringing ideas to life through code.</p>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-item">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">Technologies</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 