import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  Gltf,
  OrbitControls,
  Box,
  Stats,
  Text3D,
  RoundedBox,
} from "@react-three/drei";
import React, { useRef, useEffect, useState, forwardRef } from "react";
import Education from "../../data/Education.json";
const About = ({ setCurPage, setCameraFlag }) => {
  const keysPressed = useRef({ escape: false });
  const [curIndex, setCurIndex] = useState(0);
  console.log("About");
  useEffect(() => {
    const handleKeyDown = (event) => {
      keysPressed.current[event.key.toLowerCase()] = true;

      changeSelected();
    };
    const handleKeyUp = (event) => {
      keysPressed.current[event.key.toLowerCase()] = false;
      changeSelected();
    };

    const changeSelected = () => {
      const { escape } = keysPressed.current;
      if (escape) {
        setCameraFlag(false);
        // setCurPage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <Text3D
        size={0.03}
        position={[-0.55, 1.05, -5.556]}
        scale={[1, 1, 0.1]}
        font={"/assets/amiri.json"}
      >
        Education
        <meshStandardMaterial color={"black"} />
      </Text3D>
      {Object.keys(Education).map((val, index) => (
        <>
          {" "}
          <Text3D
            lineHeight={0.5}
            size={0.015}
            position={[-0.55, 0.96 - index * 0.05, -5.556287]}
            scale={[1, 1, 0.1]}
            font={"/assets/amiri.json"}
          >
            &#x2022; {val} ({Education[val]["date"]})
            <meshStandardMaterial color={"black"} />
          </Text3D>{" "}
        </>
      ))}
    </>
  );
};

export default About;
