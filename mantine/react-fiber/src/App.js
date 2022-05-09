import './App.scss';
import { Canvas, useFrame } from 'react-three-fiber';
import { useRef } from 'react';

const SpinningMesh = ({ position = [], dimension = [], color }) => {
  const boxRef = useRef();

  useFrame(() => {
    boxRef.current.rotation.x = boxRef.current.rotation.y += 0.01;
  });

  return (
    <mesh castShadow ref={boxRef} position={position}>
      <boxBufferGeometry attach="geometry" args={dimension ?? [1, 1, 1]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
};

function App() {
  return (
    <Canvas
      camera={{
        position: [-5, 2, 10],
        fov: 75,
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[0, 10, 0]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>
      <pointLight position={[-10, 0, 20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />

      <group>
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -3, 0]}
        >
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <shadowMaterial attach="material" />
        </mesh>
      </group>

      <SpinningMesh position={[-2, 1, -5]} color="teal" />
      <SpinningMesh position={[0, 1, 0]} dimension={[3, 2, 1]} color="pink" />
      <SpinningMesh position={[5, 1, -2]} color="teal" />
    </Canvas>
  );
}

export default App;
