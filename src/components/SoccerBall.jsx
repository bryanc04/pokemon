import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useAnimations, Gltf } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const SoccerBall = ({ playerRef, ballRef, resetPositions }) => {
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const ballGLTF = useLoader(GLTFLoader, '/assets/soccer_ballc.glb');
  if (ballRef.current){
    console.log(ballRef.current)
  }
  // const { actions, mixer } = useAnimations(ballGLTF.animations, ballRef);

  // useEffect(() => {
  //   if (ballGLTF) {
  //     ballRef.current = ballGLTF.scene;
  //   }
  // }, [ballGLTF]);

  // useFrame((state, delta) => {
  //   if (playerRef.current && ballRef.current) {
  //     const playerPosition = new THREE.Vector3().setFromMatrixPosition(playerRef.current.matrixWorld);
  //     const ballPosition = new THREE.Vector3().setFromMatrixPosition(ballRef.current.matrixWorld);
  //     const distance = playerPosition.distanceTo(ballPosition);
  //     const playerRadius = 0.5;
  //     const ballRadius = 0.2;
  //     const combinedRadius = playerRadius + ballRadius;

  //     if (distance < 3 + combinedRadius) {
  //       if (playerRef.current.animations.key === 'enter') {
  //         const direction = new THREE.Vector3().subVectors(ballPosition, playerPosition).normalize();
  //         direction.y = 0; // Ensure the direction is constrained to the horizontal plane
  //         velocity.current.copy(direction.multiplyScalar(0.5)); // Adjust the speed as needed
  //       } else if (distance < 2 + combinedRadius) {
  //         // Calculate the collision response
  //         const direction = new THREE.Vector3().subVectors(ballPosition, playerPosition).normalize();
  //         direction.y = 0; // Ensure the direction is constrained to the horizontal plane
  //         velocity.current.copy(direction.multiplyScalar(0.15)); // Adjust the speed as needed
  //       }
  //     }

  //     // Apply damping to slow down the ball gradually
  //     velocity.current.multiplyScalar(0.98); // Damping factor

  //     // Update ball position
  //     ballRef.current.position.add(velocity.current);

  //     // Ensure the ball stays above the ground
  //     if (ballRef.current.position.y < 0.2) {
  //       ballRef.current.position.y = 0.2;
  //     }

  //     // Rotate the ball based on velocity direction
  //     if (velocity.current.length() > 0.01) {
  //       const direction = velocity.current.clone().normalize();
  //       const angle = Math.atan2(direction.x, direction.z) - Math.PI / 2; // Adding 90 degrees (PI/2) to correct the orientation
  //       ballRef.current.rotation.set(0, angle, 0);

  //       // Adjust the animation speed based on the ball's velocity
  //       if (actions['Armature|Roll']) {
  //         actions['Armature|Roll'].timeScale = velocity.current.length() * 15; // Adjust the multiplier as needed
  //         actions['Armature|Roll'].play();
  //       }
  //     } else {
  //       if (actions['Armature|Roll']) {
  //         actions['Armature|Roll'].timeScale = 0;
  //       }
  //     }

  //     mixer.update(delta);
  //   }
  // });

  return (
    <RigidBody ref={ballRef} colliders="ball"  restitution={0.1} linearDamping={0.6} angularDamping={1} >
      <primitive 
        object={ballGLTF.scene} 
        scale={0.0001} 
        position={[0, 0.2, -1]} // Start at the origin
        rotation={[-Math.PI/2, Math.PI, 0]} 
        castShadow
        
      />    </RigidBody>
  );
};

export default SoccerBall;
