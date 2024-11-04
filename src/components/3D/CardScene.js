import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export function init3DScene(containerId) {
  const container = document.getElementById(containerId)

  // Configuración del render
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0) // Fondo transparente
  container.appendChild(renderer.domElement)

  // Creando la escena
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 1, 0)

  // Luz ambiental
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Luz direccional
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const loader = new GLTFLoader()
  loader.load('../../assets/3D/futuristic-card.glb', (glft) => {
    scene.add(glft.scene)
  }, undefined, (error) => {
    console.error("Error al cargar el modelo: ", error);
  })

  // Renderizado
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate()

  // Maneja el redimensionamiento de la ventana
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}