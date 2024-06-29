import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, extend } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class GrassMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        fTime: { value: 0.0 },
        vPlayerPosition: { value: new THREE.Vector3(0.0, -1.0, 0.0) },
        vBallPosition: { value: new THREE.Vector3(0.0, -1.0, 0.0) }, // Add ball position
        fPlayerColliderRadius: { value: 1.1 },
        fBallColliderRadius: { value: 0.3 } // Add ball collider radius
      },
      vertexShader: `
        uniform float fTime;
        uniform vec3 vPlayerPosition;
        uniform vec3 vBallPosition; // Add ball position
        uniform float fPlayerColliderRadius;
        uniform float fBallColliderRadius; // Add ball collider radius

        varying vec3 vWorldPosition;
        varying float fDistanceFromGround;
        varying vec3 vInstanceColor;

        float rand(float n){return fract(sin(n) * 43758.5453123);}

        float rand(vec2 n) { 
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float createNoise(vec2 n) {
          vec2 d = vec2(0.0, 1.0);
          vec2 b = floor(n);
          vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));

          return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
        }

        vec3 localToWorld(vec3 target) {
          return (modelMatrix * instanceMatrix * vec4(target, 1.0)).xyz;
        }

        void main() {
          fDistanceFromGround = max(0.0, position.y);
          vInstanceColor = instanceColor;

          vec3 worldPosition = localToWorld(position);
          vWorldPosition = worldPosition;

          float noise = createNoise(vec2(position.x, position.z)) * 0.6 + 0.4;

          float distanceFromPlayer = length(vPlayerPosition - worldPosition);
          float distanceFromBall = length(vBallPosition - worldPosition); // Calculate distance from ball

          // Increase sway and displacement effects when the player or ball is nearby
          float interactionStrengthPlayer = 1.0 - smoothstep(fPlayerColliderRadius * 0.5, fPlayerColliderRadius * 2.0, distanceFromPlayer);
          float interactionStrengthBall = 1.0 - smoothstep(fBallColliderRadius * 0.5, fBallColliderRadius * 2.0, distanceFromBall);

          vec3 sway = 0.3 * vec3(
            cos(fTime) * noise * fDistanceFromGround * max(interactionStrengthPlayer, interactionStrengthBall) * 4.0, // Increased sway factor
            0.0,
            sin(fTime) * noise * fDistanceFromGround * max(interactionStrengthPlayer, interactionStrengthBall) * 4.0 // Increased sway factor
          );

          vec3 vNormalPlayer = normalize(vPlayerPosition - worldPosition);
          vec3 vNormalBall = normalize(vBallPosition - worldPosition); // Calculate normal for ball
          vNormalPlayer.y = abs(vNormalPlayer.y);
          vNormalBall.y = abs(vNormalBall.y);

          float fOffsetPlayer = fPlayerColliderRadius - distanceFromPlayer;
          float fOffsetBall = fBallColliderRadius - distanceFromBall; // Calculate offset for ball

          vec3 vPlayerOffset = -(vNormalPlayer * fOffsetPlayer * interactionStrengthPlayer * 1.5); // Increased offset factor
          vec3 vBallOffset = -(vNormalBall * fOffsetBall * interactionStrengthBall * 1.5); // Increased offset factor

          worldPosition += mix(
            sway * min(1.0, min(distanceFromPlayer, distanceFromBall) / 2.0),
            vPlayerOffset + vBallOffset,
            float(distanceFromPlayer < fPlayerColliderRadius) + float(distanceFromBall < fBallColliderRadius)
          );

          gl_Position = projectionMatrix * viewMatrix * vec4(worldPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        varying float fDistanceFromGround;
        varying vec3 vInstanceColor;

        void main() {
          vec3 colorDarkest = vec3(
            24.0 / 255.0,
            30.0 / 255.0,
            41.0 / 255.0
          );
          vec3 colorBrightest = vec3(
            88.0 / 255.0,
            176.0 / 255.0,
            110.0 / 255.0
          );
          vec3 color = mix(
            colorDarkest,
            colorBrightest,
            fDistanceFromGround / 2.0
          );

          gl_FragColor = vec4(color, 1.);
        }
      `
    });
  }
}

extend({ GrassMaterial });

const GrassSurface = ({ assets, playerRef, ballRef, position }) => {
  const { scene, clock } = useThree();
  const grassStuff = useRef();
  const GRASS_COUNT = 100000;

  useEffect(() => {
    const createGrassPatch = async () => {
      const gltf = await new GLTFLoader().loadAsync(assets.grassModel);
      const island = await new GLTFLoader().loadAsync('/assets/island.glb');

      const grassGeometry = gltf.scene.children[0].geometry.clone();

      grassStuff.current = {
        mesh: new THREE.InstancedMesh(grassGeometry, new GrassMaterial({ side: THREE.DoubleSide }), GRASS_COUNT),
        update: () => {
          grassStuff.current.mesh.material.uniforms.fTime.value = clock.getElapsedTime();
          if (playerRef.current) {
            grassStuff.current.mesh.material.uniforms.vPlayerPosition.value.copy(playerRef.current.position);
            // console.log("Player Position: ", playerRef.current.position);
          }
          if (ballRef.current) {
            grassStuff.current.mesh.material.uniforms.vBallPosition.value.copy(ballRef.current.position);
          }
          requestAnimationFrame(grassStuff.current.update);
        }
      };

      scene.add(grassStuff.current.mesh);
      grassStuff.current.mesh.position.set(...position);

      const dummy = new THREE.Object3D();
      const radius = 30; // Radius of the circular distribution
      for (let i = 0; i < GRASS_COUNT; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const r = Math.sqrt(Math.random()) * radius;
        dummy.position.set(
          r * Math.cos(angle),
          0,
          r * Math.sin(angle)
        );
        dummy.rotation.set(0, Math.random() * 2 * Math.PI, 0);
        dummy.scale.setScalar(Math.random() * 0.25 + 0.25);
        dummy.updateMatrix();
        grassStuff.current.mesh.setMatrixAt(i, dummy.matrix);
        grassStuff.current.mesh.setColorAt(i, new THREE.Color(Math.random() * 0xffffff));
      }

      grassStuff.current.mesh.instanceMatrix.needsUpdate = true;
      grassStuff.current.mesh.instanceColor.needsUpdate = true;
      grassStuff.current.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

      grassStuff.current.update();

      // Add island model
      island.scene.position.set(position[0], position[1] - 63, position[2]);
      scene.add(island.scene);
    };

    createGrassPatch();

    // Add cube texture background
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const cubeTexture = cubeTextureLoader.setPath('/assets/skybox/').load([
      'px.png', // right
      'nx.png', // left
      'pz.png', // top
      'nz.png', // bottom
      'ny.png', // back
      'py.png'  // front
    ]);
    scene.background = cubeTexture;

  }, [assets, scene, clock, playerRef, ballRef, position]);

  return null;
};

export default GrassSurface;
