import React from 'react';
import './AcademicHistory.css';

const AcademicHistory = () => {

  const openLink = (url) => {
    window.open(url, '_blank');
  };
  

  return (
    <div className="academic-container">
      <div className="about-header">
        <h2>Academic History</h2>
      </div>
      <div className="academic-content">
        <div 
          className="academic-item"
          data-theme="react"
          onClick={() => openLink('www.isep.ipp.pt')}
        >
          <div className="academic-date">2017 - 2020</div>
          <h3>Bachelor's in Computer Engineering</h3>
          <p className="academic-institution">ISEP - Instituto Superior de Engenharia do Porto</p>
          <p className="academic-details">
            Specialized in Software Engineering and Artificial Intelligence
          </p>
        </div>

        <div 
          className="academic-item"
          data-theme="purple"
          onClick={() => openLink('https://www.enit.fr/en/index.html')}
        >
          <div className="academic-date">2020</div>
          <h3>Exchange program in France</h3>
          <p className="academic-institution">
          ENIT - Ecole Nationale d'Ingénieurs de Tarbes</p>
          <p className="academic-details">
            Focus on Programming, Algorithms, and Data Structures
          </p>
        </div>

        <div 
          className="academic-item"
          data-theme="ocean"
          onClick={() => openLink('https://www.up.pt/feup/en/')}
        >
          <div className="academic-date">2021 - 2024</div>
          <h3>Master's degree<br/> Multimedia (Video Game Specialty)</h3>
          <p className="academic-institution">
          FEUP - Faculty of Engineering of the University of Porto</p>
          <p className="academic-details">
            One semester studying Advanced Computer Graphics and ML
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcademicHistory; 