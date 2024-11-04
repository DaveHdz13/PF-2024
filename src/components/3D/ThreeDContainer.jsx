// src/components/ThreeDContainer.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { gsap } from 'gsap';
import * as THREE from 'three';

const Model = () => {
  const [model, setModel] = React.useState();
  const ref = React.useRef();

  React.useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/futuristic-card.glb', (gltf) => {
      const loadedModel = gltf.scene;
      console.log(gltf.scene); // Console log para inspeccionar la escena
      loadedModel.rotation.set(0, 4.5, 0); // Ajusta la rotación
      loadedModel.scale.set(1, 1, 1); // Ajusta la escala
      setModel(loadedModel);
    });
  }, []);

  // Manejo del clic en el modelo
  const handleClick = () => {
    console.log("Modelo clickeado!");
  };

  // Manejo del mouse sobre el modelo
  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer'; // Cambia el cursor a pointer
    if (ref.current) {
      gsap.to(ref.current.position, {
        z: ref.current.position.z + 1,
        duration: 0.5,
        ease: "power2.out", // Animación suave
      });
    }
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto'; // Restablece el cursor a auto
    if (ref.current) {
      gsap.to(ref.current.position, {
        z: ref.current.position.z - 1,
        duration: 0.5,
        ease: "power2.out", // Animación suave
      });
    }
  };

  return model ? (
    <primitive 
      ref={ref}
      object={model} 
      onClick={handleClick} 
      onPointerOver={handlePointerOver} 
      onPointerOut={handlePointerOut} 
    />
  ) : null;
};

const ThreeDContainer = () => {
  return (
    <div id="3D-container" style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 1, 5], fov: 60 }}
        style={{ backgroundColor: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <Model />
        {/* <OrbitControls enableDamping={true} dampingFactor={0.05} /> */}
      </Canvas>
    </div>
  );
};

export default ThreeDContainer;
