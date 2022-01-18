// Import threejs
import * as THREE from './node_modules/three/build/three.module.js';

// Elements
var canvas;
window.onload = () => {
  canvas = document.getElementById('canvas-3d');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  //   Set canvas size
  renderer.setSize(window.innerWidth, window.innerHeight);

  //   Set camera
  const camera = new THREE.PerspectiveCamera(
    45, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
  );

  //   Set camera position
  camera.position.set(0, 0, 5);

  //   Set scene
  const scene = new THREE.Scene();

  //   Set light
  const light = new THREE.DirectionalLight(0xFFFFFF, 1);
  light.position.set(0, 0, 10);
  scene.add(light);

  // Create a cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //   Create shiness
  const material = new THREE.MeshPhongMaterial({
    color: 0x44aa88,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.lookAt(cube.position);

  //   Rotate cube
  const animate = () => {
    requestAnimationFrame(animate);
    // Time elapsed since last frame
    const time = Date.now() * 0.001;
    cube.rotation.x = time;
    renderer.render(scene, camera);
  };
  animate();
};
