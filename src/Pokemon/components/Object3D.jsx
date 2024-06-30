import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const Object3D = () => {
    const meshRef = useRef();

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    meshRef.current.position.z -= 0.5;
                    break;
                case 'ArrowDown':
                    meshRef.current.position.z += 0.5;
                    break;
                case 'ArrowLeft':
                    meshRef.current.position.x -= 0.5;
                    break;
                case 'ArrowRight':
                    meshRef.current.position.x += 0.5;
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useFrame(() => {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
};

export default Object3D;
