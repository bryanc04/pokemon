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
  Center,
} from "@react-three/drei";
import React, { useRef, useEffect, useState, forwardRef } from "react";
import Publications from "../../data/Publications.json";

const About = ({ setCurPage, setCameraFlag }) => {
  const keysPressed = useRef({ escape: false });
  const [curIndex, setCurIndex] = useState(0);
  const [nthLine, setNthLine] = useState(0);
  console.log("About");

  const trim = (text, length = 100) => {
    let result = "";
    let index = 0;
    let ret = 0;

    while (index < text.length) {
      // Find the end index for the current segment

      let endIndex = index + length;

      // If the end index is within a word, move it back to the previous space
      if (endIndex < text.length && text[endIndex] !== " ") {
        while (endIndex > index && text[endIndex] !== " ") {
          endIndex--;
        }
      }

      // If no space was found, break at the original length (handles very long words)
      if (endIndex === index) {
        endIndex = index + length;
      }

      // Add the current segment to the result
      result += text.substring(index, endIndex).trim();

      // Add a newline character if this isn't the last segment of the string
      if (endIndex < text.length) {
        result += "\n";
        ret += 1;
      }

      // Move the index forward to the next segment, skipping any spaces
      index = endIndex;
      while (index < text.length && text[index] === " ") {
        index++;
      }
    }

    return [result, ret + 1]; // Added 1 to include the current line
  };

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

  let currentY = 0.96;

  return (
    <>
      <Text3D
        size={0.03}
        position={[-0.55, 1.05, -5.556]}
        scale={[1, 1, 0.1]}
        font={"/assets/amiri.json"}
      >
        Publications
        <meshStandardMaterial color={"black"} />
      </Text3D>
      {Object.keys(Publications).map((val, index) => {
        const [trimmedDescription, lines] = trim(Publications[val]["citation"]);
        const descriptionY = currentY - 0.05;
        return (
          <React.Fragment key={index}>
            <Text3D
              lineHeight={0.5}
              w
              size={0.015}
              position={[-0.55, currentY, -5.556287]}
              scale={[1, 1, 0.1]}
              font={"/assets/amiri.json"}
            >
              &#x2022; {trimmedDescription.replace(/&quot;/g, '"')}
              <meshStandardMaterial color={"black"} />
            </Text3D>
            {(currentY = descriptionY - (lines + 1) * 0.015)}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default About;
