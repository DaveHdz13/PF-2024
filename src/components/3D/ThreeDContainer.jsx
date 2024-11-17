// src/components/ThreeDContainer.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Spinner from '../Spinner/Spinner.jsx';
import * as THREE from 'three';

const Model = ({ onLoaded }) => {
  const [model, setModel] = React.useState();
  const ref = React.useRef();

  React.useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/futuristic-card.glb',
      (gltf) => {
        const loadedModel = gltf.scene;
        console.log(gltf.scene);
        loadedModel.rotation.set(0, 4.5, 0);
        loadedModel.scale.set(1, 1, 1);
        setModel(loadedModel);
        onLoaded(); // Notifica que el modelo terminó de cargar
      },
      undefined, // Progreso opcional
      (error) => {
        console.error('Error cargando el modelo:', error);
        onLoaded(); // Notifica aunque falle, para ocultar el spinner
      }
    );
  }, [onLoaded]);

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  }

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  }

  return model ? (
    <primitive
      ref={ref}
      object={model}
      onClick={() => console.log("Modelo clickeado!")}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  ) : null;
};

const ThreeDContainer = () => {
  const [loading, setLoading] = React.useState(true);

  // Maneja el cambio de estado de carga
  const handleLoaded = () => setLoading(false);

  return (
    <div id="3D-container" style={{ width: '100%', height: '80vh', position: 'relative', marginTop: '10%' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <Spinner />
        </div>
      )}
      <Canvas
        camera={{ position: [0, 1, 5], fov: 60 }}
        style={{ backgroundColor: 'transparent', opacity: loading ? 0 : 1 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <Model onLoaded={handleLoaded} />
        <OrbitControls
          enableRotate={true}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-0.8}
          maxAzimuthAngle={0.3}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDContainer;
