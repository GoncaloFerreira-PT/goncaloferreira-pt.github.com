import './App.css';
import SceneInit from './lib/SceneInit';
import { useEffect } from 'react';
import ProjectCarousel from './components/ProjectCarousel';
import AboutMe from './components/AboutMe';

function App() {

  useEffect(() => {
    const scene = new SceneInit('canvas', 7);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <canvas id="canvas" />
        </div>
        <h1>Gonçalo Ferreira</h1>
        <p className="subtitle">Full Stack Developer</p>
        <AboutMe />
        <ProjectCarousel />
      </header>
    </div>
  );
}

export default App;
