import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RigidBody } from "@react-three/rapier";
import {
  Box,
  Gltf,
  Cone,
  Text3D,
  Center,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";

const MapModel = () => {
  const rotate = useRef();
  const rotatebox = useRef();
  const { progress } = useProgress();
  console.log(progress);
  // useEffect(() => {
  //   if (rotate.current) {
  //     rotate.current.geometry.computeBoundingBox();
  //     const boundingBox = rotate.current.geometry.boundingBox;
  //     const center = new THREE.Vector3();
  //     boundingBox.getCenter(center);
  //     rotate.current.position.sub(center);
  //   }
  // }, []);

  // useFrame(() => {
  //   if (rotate.current) {
  //     rotate.current.rotation.y += 0.01;
  //   }if (rotatebox.current) {
  //     rotatebox.current.rotation.y += 0.01;
  //   }

  // });

  return (
    <>
      <Text3D
        ref={rotate}
        position={[0.15, 0.2, -3]}
        size={0.1}
        rotation={[0, -0.8, 0.3]}
        scale={[1, 1, 0.1]}
        font={"./assets/roboto.json"}
      >
        &lt; - Come Here!
        <meshStandardMaterial color={"blue"} />
      </Text3D>

      <RigidBody type="fixed" colliders="trimesh">
        <Gltf
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]}
          scale={0.12}
          src="./assets/town.glb"
          friction={2}
        />
      </RigidBody>
    </>
  );
};

export default MapModel;
