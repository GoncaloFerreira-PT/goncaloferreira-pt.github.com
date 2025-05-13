import * as THREE from 'three';

class SceneInit {
  constructor(canvasId) {
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
    this.particles = undefined;
    this.particleSystem = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;

    this.initialize();
    this.createParticleBackground();
    this.animate();

    // Create cube
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    this.boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    // Create pyramid (cone)
    const pyramidGeometry = new THREE.ConeGeometry(10, 16, 4); // radius, height, segments
    const pyramidMaterial = new THREE.MeshNormalMaterial();
    this.pyramidMesh = new THREE.Mesh(pyramidGeometry, pyramidMaterial);

    // Position both shapes on the left side
    const offset = -25;
    
    // Position cube
    this.boxMesh.position.x = -offset;
    this.boxMesh.position.y = 5; // Move up
    this.boxMesh.position.z = 0;

    // Position pyramid
    this.pyramidMesh.position.x = offset;
    this.pyramidMesh.position.y = -5; // Move down
    this.pyramidMesh.position.z = 0;
    this.pyramidMesh.rotation.y = Math.PI / 4; // Rotate 45 degrees for better view

    this.scene.add(this.boxMesh);
    this.scene.add(this.pyramidMesh);
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
    
    // Adjust camera position to better view both shapes
    this.camera.position.z = 48;

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
    this.directionalLight.position.set(-25, 32, 64);
    this.scene.add(this.directionalLight);

    // Event listeners
    window.addEventListener('resize', () => this.onWindowResize(), false);
    window.addEventListener('wheel', (event) => this.onMouseWheel(event), false);
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
    
    // Calculate rotation direction and speed
    this.rotationSpeed = this.rotationSpeed * (1 - this.rotationDamping) + 
                        this.targetRotationSpeed * this.rotationDamping;
    
    // Animate shapes
    if (this.boxMesh != undefined && this.pyramidMesh != undefined) {
      this.boxMesh.rotateX(this.rotationSpeed);
      this.boxMesh.rotateY(this.rotationSpeed);
      
      this.pyramidMesh.rotateX(this.rotationSpeed);
      this.pyramidMesh.rotateY(this.rotationSpeed);
      
      this.targetRotationSpeed *= 0.99;
    }

    // Animate particle background
    if (this.particleSystem) {
      // Base rotation follows the shapes' rotation
      const particleRotationSpeed = this.rotationSpeed * 0.5;
      this.particleSystem.rotation.y += particleRotationSpeed;
      this.particleSystem.rotation.x += particleRotationSpeed * 0.4;

      // Make particles move in a wave pattern that follows rotation direction
      const positions = this.particleSystem.geometry.attributes.position.array;
      const time = Date.now() * 0.0001;
      const rotationInfluence = this.rotationSpeed * 50; // Scale up the influence

      for (let i = 0; i < positions.length; i += 3) {
        // Wave motion
        positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.1;
        
        // Add motion in rotation direction
        positions[i] += rotationInfluence * 0.1;
        positions[i + 2] += rotationInfluence * 0.1;

        // Reset particles that move too far
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
    
    // Update positions on window resize
    const leftOffset = -window.innerWidth / 18;
    if (this.boxMesh && this.pyramidMesh) {
      this.boxMesh.position.x = leftOffset;
      this.pyramidMesh.position.x = leftOffset;
      this.camera.position.x = leftOffset;
      this.directionalLight.position.x = leftOffset;
    }
  }
}


export default SceneInit;