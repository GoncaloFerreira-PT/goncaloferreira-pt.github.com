import React, { useState } from 'react';
import './ProjectCarousel.css';

const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A modern web application built with React and Node.js',
    image: '/images/projectTemplateImage.png',
    link: '#'
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'Mobile-first responsive design with cutting-edge animations',
    image: '/images/projectTemplateImage.png',
    link: '#'
  },
  {
    id: 3,
    title: 'Project Three',
    description: '3D visualization tool built with Three.js',
    image: '/images/projectTemplateImage.png',
    link: '#'
  }
];

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={prevSlide}>❮</button>
      <div className="carousel-content">
        <div className="project-card">
          <img src={projects[currentIndex].image} alt={projects[currentIndex].title} />
          <h3>{projects[currentIndex].title}</h3>
          <p>{projects[currentIndex].description}</p>
          <a href={projects[currentIndex].link} className="project-button">
            Check it out
          </a>
        </div>
      </div>
      <button className="carousel-button next" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default ProjectCarousel; 