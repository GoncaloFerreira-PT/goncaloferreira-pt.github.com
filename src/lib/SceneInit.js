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
    
    // Mouse interaction components
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredObject = null;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;

    this.initialize();
    this.createObjects(6);
    this.createParticleBackground();
    this.animate();
  }

  createObjects(count) {
    const material = new THREE.MeshNormalMaterial();

    // Calculate the total width needed based on object count
    const spacing = 40; // Space between objects
    const totalWidth = (count - 1) * spacing;
    const startX = -totalWidth / 2;

    for (let i = 0; i < count; i++) {
      // Alternate between cube and pyramid
      const geometry = i % 2 === 0 ? new THREE.BoxGeometry(16, 16, 16) : new THREE.ConeGeometry(10, 16, 4);
      const mesh = new THREE.Mesh(geometry, material.clone()); // Clone material for individual control

      // Position objects in a line
      mesh.position.x = startX + (i * spacing);
      
      // Add some variation in Y position
      mesh.position.y = i % 2 === 0 ? 10 : -10;
      
      // Add some random initial rotation
      mesh.rotation.y = Math.random() * Math.PI;

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

    if(this.hoveredObject) {
      // Scale down the object to create a "pressed" effect
      this.hoveredObject.scale.multiplyScalar(0.9);
    }
  }

  onMouseUp(event) {
    if (this.hoveredObject) {
      // Restore the original scale
      this.hoveredObject.scale.set(1.0, 1.0, 1.0);
    }
  }

  onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.objects);

    // Reset previously hovered object if exists
    if (this.hoveredObject && (!intersects.length || intersects[0].object !== this.hoveredObject)) {
      this.hoveredObject.material = new THREE.MeshNormalMaterial();
      this.hoveredObject = null;
    }

    // Set new hovered object
    if (intersects.length) {
      const object = intersects[0].object;
      if (this.hoveredObject !== object) {
        this.hoveredObject = object;
        this.hoveredObject.material = new THREE.MeshPhongMaterial({ 
          color: 0xff3366,
        });
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
    window.requestAnimationFrame(this.animate.bind(this));
    
    // Calculate rotation speed
    this.rotationSpeed = this.rotationSpeed * (1 - this.rotationDamping) + 
                        this.targetRotationSpeed * this.rotationDamping;
    
    // Animate all objects
    this.objects.forEach(object => {
      object.rotateX(this.rotationSpeed);
      object.rotateY(this.rotationSpeed);
    });
    
    // Gradually decrease target rotation speed
    this.targetRotationSpeed *= 0.99;

    // Animate particle background
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