import * as THREE from 'three';

class SceneInit {
  constructor(canvasId) { // Default to 5 objects if not specified
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    // NOTE: Additional components.
    this.clock = undefined;
    this.rotationSpeed = 0.01;
    this.targetRotationSpeed = 0.01;
    this.rotationDamping = 0.98; // Damping factor for smooth deceleration
    this.MAX_ROTATION_SPEED = 0.01; // Maximum rotation speed
    this.MIN_ROTATION_SPEED = -0.01; // Minimum rotation speed
    this.objects = [];
    this.time = 0;
    
    // Mouse interaction components
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredObject = null;

    // Theme colors
    this.themeColors = {
      'react': new THREE.Color('#61dafb'),
      'purple': new THREE.Color('#9d4edd'),
      'ocean': new THREE.Color('#2cb67d'),
      'sunset': new THREE.Color('#ff6b6b')
    };
    
    // Get initial theme from DOM
    const themeClass = document.querySelector('[class*="theme-"]');
    if (themeClass) {
      const themeMatch = themeClass.className.match(/theme-(\w+)/);
      this.currentTheme = themeMatch ? themeMatch[1].toLowerCase() : 'react';
    } else {
      this.currentTheme = 'react';
    }

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;

    this.initialize();
    this.createObjects(4);
    this.createParticleBackground();
    this.animate();
  }

  setTheme(themeName) {
    if (this.themeColors[themeName]) {
      this.currentTheme = themeName;
      // Update particle colors based on theme
      if (this.particleSystem) {
        const colors = this.particleSystem.geometry.attributes.color.array;
        const themeColor = this.themeColors[themeName];
        for (let i = 0; i < colors.length; i += 3) {
          colors[i] = themeColor.r * 0.7 + Math.random() * 0.3;     // R
          colors[i + 1] = themeColor.g * 0.7 + Math.random() * 0.3; // G
          colors[i + 2] = themeColor.b * 0.7 + Math.random() * 0.3; // B
        }
        this.particleSystem.geometry.attributes.color.needsUpdate = true;
      }
    }
  }

  createObjects(count) {
    const geometries = [
      new THREE.BoxGeometry(16, 16, 16),
      new THREE.ConeGeometry(10, 16, 4),
      new THREE.OctahedronGeometry(10),
      new THREE.TorusGeometry(8, 3, 16, 100)
    ];

    const themes = ['ocean', 'react', 'purple', 'sunset'];
    const spacing = 40;
    const totalWidth = (count - 1) * spacing;
    const startX = -totalWidth / 2;

    for (let i = 0; i < count; i++) {
      const geometry = geometries[i];
      const theme = themes[i];
      const themeColor = this.themeColors[theme];
      
      const material = new THREE.MeshPhongMaterial({
        color: themeColor,
        emissive: themeColor,
        emissiveIntensity: 0.2,
        shininess: 50
      });
      
      const mesh = new THREE.Mesh(geometry, material);

      // Store the theme name with the mesh
      mesh.userData.theme = theme;

      // Position objects in a wave pattern
      mesh.position.x = startX + (i * spacing);
      mesh.position.y = Math.sin(i * 0.5) * 15;
      mesh.position.z = Math.cos(i * 0.5) * 15;
      
      // Add custom properties for animation
      mesh.userData.baseY = mesh.position.y;
      mesh.userData.baseZ = mesh.position.z;
      mesh.userData.phaseOffset = i * 0.5;
      mesh.userData.orbitRadius = 15;
      mesh.userData.orbitSpeed = 0.5 + Math.random() * 0.5;
      mesh.userData.baseScale = 1;

      this.objects.push(mesh);
      this.scene.add(mesh);
    }
  }

  createParticleBackground() {
    // Create particle geometry
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Create particles in a box volume
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 200;      // x
      positions[i + 1] = (Math.random() - 0.5) * 200;  // y
      positions[i + 2] = (Math.random() - 0.5) * 100;  // z

      // Color - subtle blue tones
      colors[i] = 0.5 + Math.random() * 0.5;     // R
      colors[i + 1] = 0.5 + Math.random() * 0.5; // G
      colors[i + 2] = 1;                         // B
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create particle material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    // Create particle system
    this.particleSystem = new THREE.Points(particles, particleMaterial);
    this.scene.add(this.particleSystem);
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    
    // Adjust camera position based on object count
    this.camera.position.z = 120;

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    // Add all mouse event listeners
    window.addEventListener('mousemove', (event) => this.onMouseMove(event), false);
    window.addEventListener('mousedown', (event) => this.onMouseDown(event), false);
    window.addEventListener('mouseup', (event) => this.onMouseUp(event), false);
    window.addEventListener('resize', () => this.onWindowResize(), false);
    window.addEventListener('wheel', (event) => this.onMouseWheel(event), false);
  }

  onMouseDown(event) {
    if (this.hoveredObject) {
      // Set target scale for click effect
      this.hoveredObject.userData.targetScale = 0.9;
      
      // Get the theme associated with this object
      const theme = this.hoveredObject.userData.theme;
      
      // Dispatch theme change event
      const event = new CustomEvent('themeChange', { 
        detail: { theme: theme } 
      });
      window.dispatchEvent(event);
    }
  }

  onMouseUp(event) {
    if (this.hoveredObject) {
      // Return to hover scale
      this.hoveredObject.userData.targetScale = 1.1;
    }
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objects);

    // Reset scale of previously hovered object
    if (this.hoveredObject && (!intersects.length || intersects[0].object !== this.hoveredObject)) {
      // Smoothly scale back to original size
      this.hoveredObject.userData.targetScale = 1;
      this.hoveredObject = null;
    }

    // Scale up newly hovered object
    if (intersects.length) {
      const object = intersects[0].object;
      if (this.hoveredObject !== object) {
        this.hoveredObject = object;
        // Set target scale for hover effect
        this.hoveredObject.userData.targetScale = 1.1;
      }
    }
  }

  onMouseWheel(event) {
    const scrollFactor = 0.001; // Adjust this value to control sensitivity
    this.targetRotationSpeed += event.deltaY * scrollFactor;
    
    // Clamp the rotation speed
    this.targetRotationSpeed = Math.max(
      this.MIN_ROTATION_SPEED,
      Math.min(this.MAX_ROTATION_SPEED, this.targetRotationSpeed)
    );
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.time += this.clock.getDelta();

    // Smooth rotation speed transition
    this.rotationSpeed = this.rotationSpeed * (1 - this.rotationDamping) + 
                        this.targetRotationSpeed * this.rotationDamping;
    
    // Animate objects with wave and orbital motion
    this.objects.forEach((obj) => {
      // Orbital motion
      const orbitAngle = this.time * obj.userData.orbitSpeed + obj.userData.phaseOffset;
      obj.position.y = obj.userData.baseY + Math.sin(orbitAngle) * obj.userData.orbitRadius * 0.3;
      obj.position.z = obj.userData.baseZ + Math.cos(orbitAngle) * obj.userData.orbitRadius * 0.2;

      // Rotation
      obj.rotation.x += this.rotationSpeed;
      obj.rotation.y += this.rotationSpeed;

      // Smooth scale transitions
      if (obj.userData.targetScale !== undefined) {
        const currentScale = obj.scale.x;
        const targetScale = obj.userData.targetScale;
        const scaleDiff = targetScale - currentScale;
        const newScale = currentScale + scaleDiff * 0.15; // Adjust this value to control transition speed
        obj.scale.setScalar(newScale);
      }
    });
    
    // Gradually decrease target rotation speed
    this.targetRotationSpeed *= 0.99;

    // Keep existing particle animation
    if (this.particleSystem) {
      const particleRotationSpeed = this.rotationSpeed * 0.5;
      this.particleSystem.rotation.y += particleRotationSpeed;
      this.particleSystem.rotation.x += particleRotationSpeed * 0.4;

      const positions = this.particleSystem.geometry.attributes.position.array;
      const time = Date.now() * 0.0001;
      const rotationInfluence = this.rotationSpeed * 50;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.1;
        positions[i] += rotationInfluence * 0.1;
        positions[i + 2] += rotationInfluence * 0.1;

        if (Math.abs(positions[i]) > 100) {
          positions[i] = (Math.random() - 0.5) * 200;
        }
        if (Math.abs(positions[i + 2]) > 50) {
          positions[i + 2] = (Math.random() - 0.5) * 100;
        }
      }
      this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    this.render();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}


export default SceneInit;