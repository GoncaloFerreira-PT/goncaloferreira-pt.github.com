import React from 'react';
import './WorkExperience.css';

const WorkExperience = () => {
  return (
    <div className="work-container">
      <div className="about-header">
        <h2>Work Experience</h2>
      </div>
      <div className="work-content">
        <div className="work-item">
          <div className="work-date">2023 - Present</div>
          <h3>Senior Software Engineer</h3>
          <p className="work-company">Tech Company A</p>
          <ul className="work-details">
            <li>Led development of microservices architecture</li>
            <li>Implemented CI/CD pipelines</li>
            <li>Mentored junior developers</li>
          </ul>
        </div>

        <div className="work-item">
          <div className="work-date">2021 - 2023</div>
          <h3>Full Stack Developer</h3>
          <p className="work-company">Tech Company B</p>
          <ul className="work-details">
            <li>Developed React-based web applications</li>
            <li>Built RESTful APIs using Node.js</li>
            <li>Optimized database performance</li>
          </ul>
        </div>

        <div className="work-item">
          <div className="work-date">2020 - 2021</div>
          <h3>Software Developer Intern</h3>
          <p className="work-company">Tech Company C</p>
          <ul className="work-details">
            <li>Assisted in front-end development</li>
            <li>Implemented responsive designs</li>
            <li>Fixed bugs and improved performance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience; 