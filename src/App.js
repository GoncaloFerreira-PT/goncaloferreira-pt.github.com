import logo from './logo.svg';
import './App.css';
import SceneInit from './lib/SceneInit';
import { useEffect } from 'react';
import * as THREE from 'three';

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
        <p>
          Gonçalo Ferreira
        </p>
      </header>
    </div>
  );
}

export default App;
