import './App.css';
import SceneInit from './lib/SceneInit';
import { useEffect } from 'react';
import ProjectList from './components/ProjectList';

function App() {

  useEffect(() => {
    const scene = new SceneInit('canvas');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <canvas id="canvas" />
        </div>
        <h1>Gonçalo Ferreira</h1>
        <p className="subtitle">Full Stack Developer</p>
        <ProjectList />
      </header>
    </div>
  );
}

export default App;
