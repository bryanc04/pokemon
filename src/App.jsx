import { Canvas, useFrame } from '@react-three/fiber'
import StandingDog from './components/StandingDog'
import { Physics, RigidBody } from '@react-three/rapier'
import { Gltf, OrbitControls, Box, Stats, Sphere, Cone, Text3D} from '@react-three/drei'
import DogModel from './components/DogModel'
import SoccerBall from './components/SoccerBall'
import React, { useRef, useEffect, useState, Suspense } from 'react';
import  AxesHelper from './components/AxesHelper';
import PokeCenter from './components/PokeCenter';
import MapModel from './components/MapModel';

export default function App() {
  const playerRef = useRef();
  const ballRef = useRef();
  const rotate = useRef();
  const [isCenter, setIsCenter] = useState(false);
  const [cameraFlag, setCameraFlag] = useState(true);
  const [curPage, setCurPage] = useState(null);





  useEffect(()=>{
    // if (playerRef.current){
    //   console.log(playerRef.current.position)
    // }
    console.log(isCenter)
    },[isCenter])

  
  return (
    <Canvas shadow 
    // onPointerDown={(e) => e.target.requestPointerLock()}
     camera={{ position: [0, 6, 14], wfov: 42 }}>
      <Suspense>

      <Physics gravity={[0, -1, 0]}  >
      <directionalLight intensity={7} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]} />
      <ambientLight intensity={2} />
{  isCenter ? <>
<DogModel ref={playerRef} props={[isCenter, setIsCenter, cameraFlag, setCameraFlag, curPage, setCurPage]} />
{/* <RigidBody type="kinematicVelocity">
          <Gltf position={[0, 0, -5]} rotation={[0, 0, 0]} scale={0.05} src="./assets/soccerball.glb" />
        </RigidBody> */}

<PokeCenter cameraFlag={cameraFlag} setCameraFlag={setCameraFlag} curPage={curPage} setCurPage={setCurPage}/>
</>
:     
<>
 <DogModel ref={playerRef} props={[isCenter, setIsCenter, cameraFlag, setCameraFlag, curPage, setCurPage]} />
        <SoccerBall playerRef={playerRef} ballRef={ballRef} />
                          


<MapModel />
                  

        </>
}
{/*           
                   <Box position={[0, -2, 0]} args={[10, 1, 10]} >
          <meshStandardMaterial color="springgreen" />
        </Box> */}


      </Physics>
      <Stats/>

      <AxesHelper />
      </Suspense>
    </Canvas>
  )
}
