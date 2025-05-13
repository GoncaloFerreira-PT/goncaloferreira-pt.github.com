import React from 'react';
import './AcademicHistory.css';
import { useTheme } from '../context/ThemeContext';

const AcademicHistory = () => {
  const { THEMES, changeColorTheme } = useTheme();

  return (
    <div className="academic-container">
      <div className="about-header">
        <h2>Academic History</h2>
      </div>
      <div className="academic-content">
        <div 
          className="academic-item"
          data-theme="react"
          onClick={() => changeColorTheme(THEMES.REACT)}
        >
          <div className="academic-date">2020 - 2023</div>
          <h3>Master's in Computer Engineering</h3>
          <p className="academic-institution">University of Porto</p>
          <p className="academic-details">
            Specialized in Software Engineering and Artificial Intelligence
          </p>
        </div>

        <div 
          className="academic-item"
          data-theme="purple"
          onClick={() => changeColorTheme(THEMES.PURPLE)}
        >
          <div className="academic-date">2016 - 2020</div>
          <h3>Bachelor's in Computer Science</h3>
          <p className="academic-institution">University of Porto</p>
          <p className="academic-details">
            Focus on Programming, Algorithms, and Data Structures
          </p>
        </div>

        <div 
          className="academic-item"
          data-theme="ocean"
          onClick={() => changeColorTheme(THEMES.OCEAN)}
        >
          <div className="academic-date">2019</div>
          <h3>Exchange Program</h3>
          <p className="academic-institution">Technical University of Munich</p>
          <p className="academic-details">
            One semester studying Advanced Computer Graphics and ML
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcademicHistory; 