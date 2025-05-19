import React from 'react';
import './WorkExperience.css';

const WorkExperience = () => {
  const openLink = (url) => {
    window.open(url, '_blank');
  };
  
  return (
    <div className="work-container">
      <div className="about-header">
        <h2>Work Experience</h2>
      </div>
      <div className="work-content">
        <div className="work-item" onClick={() => openLink('https://www.fabamaq.com')}>
          <div className="work-date">2020 - 2021</div>
          <p className="work-company">
            Fabamaq
          </p>
          <img src="/images/fabamaq.png" alt="Fabamaq logo" className="company-logo" />
          <h3>Game Developer</h3>
          <ul className="work-details">
            <li>Assisted in front-end development</li>
            <li>Implemented responsive designs</li>
            <li>Fixed bugs and improved performance</li>
          </ul>
        </div>
        <div className="work-item" onClick={() => openLink('https://www.didimo.co')}>
          <div className="work-date">2024 - Present</div>
          <p className="work-company">
            Didimo
          </p>
          <img src="/images/didimo.png" alt="Didimo logo" className="company-logo" />
          <h3>Software Engineer</h3>
          <ul className="work-details">
            <li>Led development of microservices architecture</li>
            <li>Implemented CI/CD pipelines</li>
            <li>Mentored junior developers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience; 