import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import '../shaders/FloorMaterial'; // Ensure this import registers the shader

const Floor = () => {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.material.uniforms.time.value = state.clock.getElapsedTime();
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[10000, 10000]} />
            <floorMaterial />
        </mesh>
    );
};

export default Floor;
