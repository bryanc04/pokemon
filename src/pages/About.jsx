import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame,useThree } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier'
import { Gltf, OrbitControls, Box, Stats, Text3D,RoundedBox } from '@react-three/drei'
import React, { useRef, useEffect, useState, forwardRef } from 'react';

const About = ({setCurPage, setCameraFlag}) => {
    const keysPressed = useRef({escape: false});
    const [curIndex, setCurIndex] = useState(0);
    console.log("About")
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

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);


        return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);

        };
      }, [ ]);

  return (
<>
<Text3D

            size={0.03}
            position={[-0.55, 1.05, -5.556]}
            scale={[1, 1, 0.1]}
            font={'/assets/amiri.json'}
          >
            About Me
            <meshStandardMaterial color={"black"} />
          </Text3D>
          <Text3D
lineHeight={0.5}
            size={0.015}
            position={[-0.55, 0.96, -5.556287]}
            scale={[1, 1, 0.1]}
            font={'/assets/amiri.json'}
          >
      {`Hi! My name is Bryan Chung (as you can infer from the url), and I am a high school \nsenior at The Loomis Chafee School. My interests include classical machine learning \nand natural language processing, quantum computing, astrophysics, quantum \nphysics, stochastic processes, and cryptography. \n\nYou can find me in the Katherine Brush Library every Thursday afternoon with the Go \nClub—feel free to join us there! I’m also a big soccer fan, and every Friday/Saturday \nnight I will likely be playing soccer with friends on Pratt Field. 
        \nBesides, my favorite artist is Kendrick Lamar, and I am currently on a mission to \nmemorize the lyrics of every single one of his songs!`}

            <meshStandardMaterial color={"black"} />
          </Text3D>
</>
  );
};

export default About;
