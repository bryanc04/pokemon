import { Canvas, useFrame,useLoader } from '@react-three/fiber'
import StandingDog from './components/StandingDog'
import { Physics, RigidBody } from '@react-three/rapier'
import { Gltf, OrbitControls, Box, Stats, Sphere, Cone, Text3D, useProgress} from '@react-three/drei'
import DogModel from './components/DogModel'
import SoccerBall from './components/SoccerBall'
import React, { useRef, useEffect, useState, Suspense } from 'react';
import  AxesHelper from './components/AxesHelper';
import PokeCenter from './components/PokeCenter';
import MapModel from './components/MapModel';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Loadingscreen from './components/Loadingscreen';

export default function Pokemon() {
  const playerRef = useRef();
  const ballRef = useRef();
  const rotate = useRef();
  const [isCenter, setIsCenter] = useState(false);
  const [cameraFlag, setCameraFlag] = useState(true);
  const [curPage, setCurPage] = useState(null);
  const [pokeCenterLoaded, setPokeCenterLoaded] = useState(false);
  const { active, progress, errors, item, loaded, total } = useProgress()
  const [dogLoad, setDogLoad] = useState(false);

  const pokeCenterModel = useLoader(GLTFLoader, './assets/pokecenter2.glb');
  console.log(active, progress, errors, item, loaded, total)
 
  useEffect(() => {
    if (pokeCenterModel && progress==100 ) {
      setPokeCenterLoaded(true);
      console.log("Loaded")
    }
  }, [pokeCenterModel])






  
  return (
    <Suspense fallback={<Loadingscreen percent={progress}/>}>
    <Canvas shadow 
    // onPointerDown={(e) => e.target.requestPointerLock()}
     camera={{ position: [0, 6, 14], wfov: 42 }}>


      <Physics gravity={[0, -1, 0]}  >
      <directionalLight intensity={7} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]} />
      <ambientLight intensity={2} />
{  isCenter && pokeCenterLoaded ? 
<>
{dogLoad && <DogModel ref={playerRef} props={[isCenter, setIsCenter, cameraFlag, setCameraFlag, curPage, setCurPage, [0, 0, -2.8]]} />}
{/* <RigidBody type="kinematicVelocity">
          <Gltf position={[0, 0, -5]} rotation={[0, 0, 0]} scale={0.05} src="./assets/soccerball.glb" />
        </RigidBody> */}

<PokeCenter cameraFlag={cameraFlag} setCameraFlag={setCameraFlag} curPage={curPage} setCurPage={setCurPage} pokeCenterModel={pokeCenterModel} setDogLoad={setDogLoad}/>
</>
:     
<>
 <DogModel ref={playerRef} props={[isCenter, setIsCenter, cameraFlag, setCameraFlag, curPage, setCurPage, [0, 0, -2.8]]} />
        <SoccerBall playerRef={playerRef} ballRef={ballRef} />
                          


<MapModel />
                  
<PokeCenter 
cameraFlag={cameraFlag} setCameraFlag={setCameraFlag} curPage={curPage} setCurPage={setCurPage} pokeCenterModel={pokeCenterModel} setDogLoad={setDogLoad} scale={0.0000000001}
/>

        </>
}
{/*           
                   <Box position={[0, -2, 0]} args={[10, 1, 10]} >
          <meshStandardMaterial color="springgreen" />
        </Box> */}


      </Physics>
      <Stats/>

      <AxesHelper />
      
    </Canvas>
    </Suspense>
  )
}
