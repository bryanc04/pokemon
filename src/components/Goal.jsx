import React, { forwardRef, useMemo, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Goal = forwardRef(({ position, rotation, ballRef }, ref) => {
  const gltf = useLoader(GLTFLoader, '/assets/goal.glb');


  const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      position={position.toArray()}
      rotation={rotation.toArray()}
      scale={0.02}
    />
  );
});

export default Goal;
