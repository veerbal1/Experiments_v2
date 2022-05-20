import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

const Box = ({ position }) => {
  const [hover, setHover] = React.useState(false);
  const [clicked, click] = React.useState(false);
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      onClick={() => click(!clicked)}
      position={position}
      scale={clicked ? 2 : 1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color={hover ? 'hotpink' : 'yellow'} />
    </mesh>
  );
};

export default Box;
