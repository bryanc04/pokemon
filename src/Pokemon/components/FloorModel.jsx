import React, { useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const FloorModel = ({ position }) => {
  const fbx = useLoader(GLTFLoader, '/assets/soccer/stadium.glb');
  const { scene } = useThree();
  scene.add(fbx)
  useEffect(() => {
    if (fbx) {
      console.log('FBX Model Loaded:', fbx);
    } else {
      console.error('Failed to load FBX model');
    }
  }, [fbx]);

  return <primitive object={fbx.scene}  rotation={[0, Math.PI/2, 0]} scale={[5, 5,5]} position={[0,-3,0]} />;
};

export default FloorModel;
