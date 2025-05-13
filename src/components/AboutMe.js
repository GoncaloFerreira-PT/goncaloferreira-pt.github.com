import React from 'react';
import './AboutMe.css';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiMongodb, SiThreedotjs, SiGodotengine } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

const AboutMe = () => {
  const { THEMES, changeColorTheme } = useTheme();
  
  const calculateYearsOfExperience = () => {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    return `${years}+`;
  };

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <h2>About Me</h2>
          <div className="profile-picture-container">
            <img 
              src="/images/projectTemplateImage.png" 
              alt="Profile" 
              className="profile-picture"
            />
          </div>
          <div className="tech-stack">
            <span className="tech-tag">
              <FaReact className="tech-icon" />
              React
            </span>
            <span className="tech-tag">
              <FaNodeJs className="tech-icon" />
              Node.js
            </span>
            <span className="tech-tag">
              <SiThreedotjs className="tech-icon" />
              Three.js
            </span>
            <span className="tech-tag">
              <FaPython className="tech-icon" />
              Python
            </span>
            <span className="tech-tag">
              <SiMongodb className="tech-icon" />
              MongoDB
            </span>
            <span className="tech-tag">
              <SiGodotengine className="tech-icon" />
              Godot
            </span>
          </div>
        </div>

        <div>
          <div className="about-grid">
            <div 
              className="about-card" 
              data-theme="react"
              onClick={() => changeColorTheme(THEMES.REACT)}
            >
              <h3>🎯 Focus</h3>
              <p>Passionate about creating immersive web experiences and solving complex problems through elegant code solutions.</p>
            </div>
            
            <div 
              className="about-card"
              data-theme="purple"
              onClick={() => changeColorTheme(THEMES.PURPLE)}
            >
              <h3>💡 Expertise</h3>
              <p>Specialized in full-stack development with a strong focus on 3D web technologies and interactive user experiences.</p>
            </div>
            
            <div 
              className="about-card"
              data-theme="ocean"
              onClick={() => changeColorTheme(THEMES.OCEAN)}
            >
              <h3>🚀 Journey</h3>
              <p>From backend systems to frontend animations, I love pushing the boundaries of what's possible on the web.</p>
            </div>
            
            <div 
              className="about-card"
              data-theme="sunset"
              onClick={() => changeColorTheme(THEMES.SUNSET)}
            >
              <h3>🤝 Collaboration</h3>
              <p>Experienced in working with cross-functional teams and bringing ideas to life through code.</p>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">{calculateYearsOfExperience()}</span>
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
    </div>
  );
};

export default AboutMe; 