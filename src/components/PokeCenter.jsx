import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame,useThree } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier'
import { Gltf, OrbitControls, Box, Stats, Text3D, useProgress, Cylinder } from '@react-three/drei'
import StandingDog from './StandingDog';
import React, { useRef, useEffect, useState, forwardRef, Suspense } from 'react';
import About from '../pages/About';
import Education from '../pages/Education';
import Experiences from '../pages/Experiences';
import Publications from '../pages/Publications';
import Honors from '../pages/Honors';

const pages = {
    'About': About,
    'Education': Education,
    'Experiences': Experiences,
    'Publications': Publications,
    'Honors': Honors,
    'Fun Facts!': () => <></>
  };
const PokeCenter = ({cameraFlag, setCameraFlag, curPage, setCurPage, pokeCenterModel, setDogLoad, scale=1}) => {
    const keysPressed1 = useRef({ arrowup: false, arrowdown: false, enter: false});
    const [curIndex, setCurIndex] = useState(0);
    const props = { setCurPage, setCameraFlag };
    const {progress} = useProgress()
    console.log("f")
    useEffect(() =>{
        console.log(progress)
        if (progress == 100){
        
            setDogLoad(true)
    
        }
    }
    ,[progress])
    

    useEffect(() => {

        console.log(curPage)

        const handleKeyDown = (event) => {
          keysPressed1.current[event.key.toLowerCase()] = true;
          changeSelected();
        };
        const handleKeyUp = (event) => {
            keysPressed1.current[event.key.toLowerCase()] = false;
            changeSelected();
          };
    
          console.log(cameraFlag)
    
        const changeSelected = () => {
          const { arrowup,arrowdown,enter } = keysPressed1.current;
          if ((arrowup || arrowdown || enter ) && !cameraFlag) {
            if (arrowdown) {
              setCurIndex((curIndex+1) % 5);
              console.log((curIndex+1)%5)
            } else if (arrowup) {
             setCurIndex((((curIndex-1) %5)+5)%5)
            } else if (enter) {
                setCurPage(Object.keys(pages)[curIndex]);
            }
          }


        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);


        return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);

        };
      }, [curIndex, cameraFlag]);
      const PageComponent = curPage ? pages[curPage] : null;
      console.log(curPage)



  return (
  <>{  progress==100 ?
<RigidBody type="fixed" colliders="trimesh">
    {curPage ?      <PageComponent {...props} />
 : 
    <>
    {Object.keys(pages).map((page, index) => {
        return (
          <Text3D
            key={index}
            size={scale*0.03}
            position={[-0.55, 1.05-index*0.08, -5.556]}
            scale={[1, 1, 0.1]}
            font={'/assets/alike.json'}
          >
            {page} {curIndex == index ?" <": <></>}
            <meshStandardMaterial color={"black"} />
          </Text3D>
        );
    } 
    )
    }
    
    <Text3D
            size={0.01}
            position={[-0.55, 0.55, -5.556]}
            scale={[scale*1, scale*1, scale*0.1]}
            font={'/assets/pixel.json'}
          >
            press enter to select / press esc to exit view
            <meshStandardMaterial color={"black"} />
          </Text3D> </>
}

<Text3D position={[0.15, 0.1, -4.5]} size={0.05} rotation={[0,-0.8,0]} scale={[scale*1,scale*1,scale*0.2]} font={"./assets/roboto.json"}>
  &lt; - Press Enter Here!
    <meshStandardMaterial color={'blue'} />

  </Text3D>        <StandingDog scale={scale}/>
  <primitive 
          object={pokeCenterModel.scene} 
          castShadow 
          receiveShadow 
          position={[0, -0, -4]} 
          rotation={[0, 0, 0]} 
          scale={0.3*scale} 
        />
        </RigidBody>
         : 
        <>       
         <Cylinder position={[0,-1.4,-4]} args={[1,0.05*progress,1]} rotation={[Math.PI/2-0.7, 0,0]}>
    <meshStandardMaterial color={"white"}/>
        </Cylinder>
        <Box position={[0,-1.4,-6]} args={[10,10,1]} rotation={[-0.7,0,0]}>
    <meshStandardMaterial color={"black"}/>
        </Box>

        </>
        }</>
  );
};

export default PokeCenter;
