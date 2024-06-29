import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const FloorMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color('gray') },
    `
        varying vec3 vPos;
        void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    `
        uniform float time;
        uniform vec3 color;
        varying vec3 vPos;
        void main() {
            float grid = abs(sin(vPos.x * 10.0) * sin(vPos.z * 10.0));
            gl_FragColor = vec4(mix(color, vec3(1.0), grid), 1.0);
        }
    `
);

extend({ FloorMaterial });
