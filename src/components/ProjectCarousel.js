import React, { useState } from 'react';
import './ProjectCarousel.css';
import { useTheme } from '../context/ThemeContext';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and real-time inventory management.',
    image: '/images/projectTemplateImage.png',
    link: '#'
  },
  {
    id: 2,
    title: 'AI Image Generator',
    description: 'Web application that uses machine learning to generate unique artwork. Built with Python, TensorFlow, and React, featuring real-time image processing.',
    image: '/images/projectTemplateImage.png',
    link: '#'
  },
  {
    id: 3,
    title: '3D Portfolio Showcase',
    description: 'Interactive 3D portfolio built with Three.js and React. Features dynamic lighting, custom shaders, and responsive design.',
    image: '/images/projectTemplateImage.png',
    link: '#'
  },
  {
    id: 4,
    title: 'Real-time Chat Application',
    description: 'Modern chat platform using WebSocket technology, featuring end-to-end encryption, file sharing, and group chat functionality.',
    image: '/images/projectTemplateImage.png',
    link: '#'
  },
  {
    id: 5,
    title: 'Task Management System',
    description: 'Collaborative project management tool with drag-and-drop interface, task assignment, and progress tracking features.',
    image: '/images/projectTemplateImage.png',
    link: '#'
  },
  {
    id: 6,
    title: 'Weather Dashboard',
    description: 'Real-time weather tracking application with interactive maps, forecast visualization, and location-based alerts.',
    image: '/images/projectTemplateImage.png',
    link: '#'
  },
  {
    id: 7,
    title: 'Social Media Analytics',
    description: 'Data visualization platform for social media metrics, featuring real-time analytics, custom reports, and trend analysis.',
    image: '/images/projectTemplateImage.png',
    link: '#'
  },
  {
    id: 8,
    title: 'Fitness Tracking App',
    description: 'Mobile-first fitness application with workout planning, progress tracking, and social features. Built with React Native.',
    image: '/images/projectTemplateImage.png',
    link: '#'
  }
];

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(null);
  const { colorTheme } = useTheme();

  const showNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setDirection('next');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      setTimeout(() => {
        setIsTransitioning(false);
        setDirection(null);
      }, 300);
    }
  };

  const showPrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setDirection('prev');
      setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
      setTimeout(() => {
        setIsTransitioning(false);
        setDirection(null);
      }, 300);
    }
  };

  const getVisibleProjects = () => {
    const visibleIndices = [
      (currentIndex - 1 + projects.length) % projects.length,
      currentIndex,
      (currentIndex + 1) % projects.length
    ];
    return visibleIndices.map(index => projects[index]);
  };

  return (
    <div className="projects-section">
      <div className="projects-header">
        <h2>Projects</h2>
      </div>
      <div className="carousel-container">
        <button className="nav-button prev" onClick={showPrev}>❮</button>
        <div className="carousel-track">
          {getVisibleProjects().map((project, index) => (
            <div 
              key={project.id}
              className={`project-card ${index === 1 ? 'active' : ''} ${
                isTransitioning ? (
                  direction === 'next' && index === 2 ? 'next' :
                  direction === 'prev' && index === 0 ? 'prev' : ''
                ) : ''
              }`}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.link} className="project-button">
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
        <button className="nav-button next" onClick={showNext}>❯</button>
      </div>
      <div className="carousel-dots">
        {projects.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setDirection(index > currentIndex ? 'next' : 'prev');
                setCurrentIndex(index);
                setTimeout(() => {
                  setIsTransitioning(false);
                  setDirection(null);
                }, 300);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel; 