import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame } from '@react-three/fiber';

// import skyScene from "/assets/sky.glb";

export function Sky({ isRotating }) {
  const sky = useLoader(GLTFLoader, '/assets/anime_sky.glb');
  const skyRef = useRef();

  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  // It ensures smooth animations by making the rotation frame rate-independent.
  // 'delta' represents the time in seconds since the last frame.
  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
    }
  });

  return (
    <mesh ref={skyRef}>

      <primitive object={sky.scene} scale={0.2}/>
    </mesh>
  );
}