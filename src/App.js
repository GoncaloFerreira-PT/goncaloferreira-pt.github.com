import './App.css';
import SceneInit from './lib/SceneInit';
import { useEffect, useRef } from 'react';
import ProjectCarousel from './components/ProjectCarousel';
import AboutMe from './components/AboutMe';
import NavHeader from './components/NavHeader';
import Footer from './components/Footer';
import AcademicHistory from './components/AcademicHistory';
import WorkExperience from './components/WorkExperience';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppContent = () => {
  const { changeColorTheme, colorTheme, isDarkMode } = useTheme();
  
  // Store the scene instance in a ref to persist it across re-renders
  const sceneRef = useRef(null);

  useEffect(() => {
    // Only create the scene if it doesn't exist
    if (!sceneRef.current) {
      sceneRef.current = new SceneInit('canvas', 4);
    }
    
    // Listen for theme changes from 3D objects
    const handleThemeChange = (event) => {
      const themeMap = {
        'react': 'react',
        'purple': 'purple',
        'ocean': 'ocean',
        'sunset': 'sunset'
      };
      const newTheme = themeMap[event.detail.theme];
      if (newTheme) {
        changeColorTheme(newTheme);
      }
    };
    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, [changeColorTheme]);

  // Update Three.js scene when theme changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setTheme(colorTheme);
      sceneRef.current.setDarkMode(isDarkMode);
    }
  }, [colorTheme, isDarkMode]);

  return (
    <div className="App">
      <NavHeader />
      <header className="App-header">
        <div>
          <canvas id="canvas" />
        </div>
        <h1>Gonçalo Ferreira</h1>
        <p className="subtitle">Computer Engineer</p>
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

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
