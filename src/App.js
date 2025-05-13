import './App.css';
import SceneInit from './lib/SceneInit';
import { useEffect } from 'react';
import ProjectCarousel from './components/ProjectCarousel';
import AboutMe from './components/AboutMe';
import NavHeader from './components/NavHeader';
import Footer from './components/Footer';
import AcademicHistory from './components/AcademicHistory';
import WorkExperience from './components/WorkExperience';

function App() {

  useEffect(() => {
    const scene = new SceneInit('canvas', 7);
  }, []);

  return (
    <div className="App">
      <NavHeader />
      <header className="App-header">
        <div>
          <canvas id="canvas" />
        </div>
        <h1>Gonçalo Ferreira</h1>
        <p className="subtitle">Full Stack Developer</p>
        
        <div className="content-sections">
          <div id="about">
            <AboutMe />
          </div>
          <div id="academic">
            <AcademicHistory />
          </div>
          <div id="work">
            <WorkExperience />
          </div>
          <div id="projects">
            <ProjectCarousel />
          </div>
        </div>
      </header>
      <Footer />
    </div>
  );
}

export default App;
