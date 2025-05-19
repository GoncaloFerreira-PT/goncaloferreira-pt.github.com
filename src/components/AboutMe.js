import React from 'react';
import './AboutMe.css';
import { FaNodeJs, FaJava, FaUnity, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiGodotengine } from 'react-icons/si';
import { IoGameController } from "react-icons/io5";
import { MdGames } from "react-icons/md";
import { useTheme } from '../context/ThemeContext';

const AboutMe = () => {
  const { THEMES, changeColorTheme } = useTheme();
  
  const calculateYearsOfExperience = () => {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    return `${years}+`;
  };

  const openLink = (url) => {
    window.open(url, '_blank');
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
              <FaJava className="tech-icon" />
              Java
            </span>
            <span className="tech-tag">
              <FaNodeJs className="tech-icon" />
              JavaScript
            </span>
            <span className="tech-tag">
              <IoGameController className="tech-icon" />
              C++
            </span>
            <span className="tech-tag">
              <MdGames className="tech-icon" />
              C#
            </span>
            <span className="tech-tag">
              <SiGodotengine className="tech-icon" />
              Godot
            </span>
            <span className="tech-tag">
              <FaUnity className="tech-icon" />
              Unity
            </span>
          </div>

          <div className="social-links-about-me">
            <button 
              className="social-button"
              onClick={() => openLink('https://github.com/GoncaloFerreira-PT')}
            >
              <FaGithub className="social-icon" />
              <span>GitHub</span>
            </button>
            <button 
              className="social-button"
              onClick={() => openLink('https://www.linkedin.com/in/gonçalo-césar-ferreira/')}
            >
              <FaLinkedin className="social-icon" />
              <span>LinkedIn</span>
            </button>
            <button 
              className="social-button"
              onClick={() => openLink('mailto:goncalo_c_ferreira@hotmail.com')}
            >
              <FaEnvelope className="social-icon" />
              <span>Email</span>
            </button>
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