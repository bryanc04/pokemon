import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame,useThree } from '@react-three/fiber';

import { useAnimations, OrbitControls } from '@react-three/drei';

import React, { useRef, useEffect, useState, forwardRef } from 'react';


const StandingDog = ({scale=1}) => {
  const gltf = useLoader(GLTFLoader, '/assets/untitled.glb');
  const meshRef = useRef();
  const rigidbody = useRef();
  const { animations } = gltf;
  const { actions } = useAnimations(animations, meshRef);
  const [currentAction, setCurrentAction] = useState('Arm_Dog|Idle_1');
  const keysPressed = useRef({ w: false, s: false, a: false, d: false, enter: false, " ": false });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cameraAngle, setCameraAngle] = useState({ horizontal: 0, vertical: 0 });
  const orbitControlsRef = useRef();
  const { camera, gl } = useThree();
  const [isRotated,setIsRoated] = useState(false)

    useEffect(()=>{
        console.log(actions)
        actions['Arm_Dog|Idle_1']?.play();
    },[actions])


  return (
    <primitive
    ref={meshRef}
    object={gltf.scene}
    scale={scale * 0.25}
    position={[0, 0, -5.1]}
    rotation={[-Math.PI / 2, Math.PI, Math.PI]}
  />
  );
};

export default StandingDog;
