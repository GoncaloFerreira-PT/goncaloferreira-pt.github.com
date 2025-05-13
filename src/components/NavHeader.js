import React, { useState, useEffect } from 'react';
import './NavHeader.css';

const NavHeader = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [showTitle, setShowTitle] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'academic', 'work', 'projects'];
      const mainHeader = document.querySelector('.App-header h1');
      
      // Check if main title is out of view
      if (mainHeader) {
        const rect = mainHeader.getBoundingClientRect();
        setShowTitle(rect.bottom < 0);
      }

      // Update active section
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className={`nav-title ${showTitle ? 'visible' : ''}`}>
          <span className="nav-name">Gonçalo Ferreira</span>
          <span className="nav-role">Full Stack Developer</span>
        </div>
        <div className="nav-links">
          <button 
            onClick={() => scrollToSection('about')} 
            className={`nav-button ${activeSection === 'about' ? 'active' : ''}`}
          >
            About Me
          </button>
          <button 
            onClick={() => scrollToSection('academic')} 
            className={`nav-button ${activeSection === 'academic' ? 'active' : ''}`}
          >
            Academic
          </button>
          <button 
            onClick={() => scrollToSection('work')} 
            className={`nav-button ${activeSection === 'work' ? 'active' : ''}`}
          >
            Experience
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className={`nav-button ${activeSection === 'projects' ? 'active' : ''}`}
          >
            Projects
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavHeader; 