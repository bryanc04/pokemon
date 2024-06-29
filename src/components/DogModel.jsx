import React, { useRef, useEffect, useState, forwardRef, Suspense } from 'react';
import { useLoader, useFrame,useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useAnimations, OrbitControls } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const MOVEMENT_SPEED = 0.005;
const ROTATION_SPEED = 0.00001;
const MAX_VEL = 0.3;

const DogModel = forwardRef((props, ref) => {
  const gltf = useLoader(GLTFLoader, '/assets/untitled1.glb');
  const meshRef = useRef();
  const rigidbody = useRef();
  const { animations } = gltf;
  const { actions } = useAnimations(animations, meshRef);
  const [currentAction, setCurrentAction] = useState('Arm_Dog|Idle_1');
  const keysPressed = useRef({ w: false, s: false, a: false, d: false, enter: false, escape: false  });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cameraAngle, setCameraAngle] = useState({ horizontal: 0, vertical: 0 });
  const orbitControlsRef = useRef();
  const { camera, gl } = useThree();
  const [isRotated,setIsRoated] = useState(false);
  const [targetCameraPosition, setTargetCameraPosition] = useState(new THREE.Vector3());
const [lerpProgress, setLerpProgress] = useState(1);
const cameraFlag = props.props[2]
const setCameraFlag = props.props[3]
// const [cameraFlag, setCameraFlag] = useState(true);
const curPage = props.props[4];

  useEffect(() => {
    // if (ref) ref.current = ref.current;

  
    const handleKeyDown = (event) => {
      keysPressed.current[event.key.toLowerCase()] = true;
      updateMovementAndAnimation();
    };

    const handleKeyUp = (event) => {
      keysPressed.current[event.key.toLowerCase()] = false;
      updateMovementAndAnimation();
    };

    const updateMovementAndAnimation = () => {
      const { w, s, a, d, enter } = keysPressed.current;
      let newAction = 'Arm_Dog|Idle_1';

      if (w || s || a || d || enter) {
        if (enter) {
          newAction = 'Arm_Dog|Attack_Bite';
        } else if (w) {
          newAction = 'Arm_Dog|Run_F_IP';
        } else if (a) {
          newAction = 'Arm_Dog|Turn_L_IP';
        } else if (d) {
          newAction = 'Arm_Dog|Turn_R_IP';
        } else if (s){
          newAction = 'Arm_Dog|Walk_B_IP';
        }
      }

      if (newAction !== currentAction) {
        actions[currentAction]?.fadeOut(0.5);
        actions[newAction]?.reset().fadeIn(0.5).play();
        setCurrentAction(newAction);
      }
      if (newAction == 'Arm_Dog|Idle_1') {
        actions[currentAction].fadeOut(0.5)
        actions['Arm_Dog|Turn_L_IP'].fadeOut(0.5)
        actions['Arm_Dog|Turn_R_IP'].fadeOut(0.5)
        actions[newAction].reset().fadeIn(0.5).play()

      }

      if (newAction === 'Arm_Dog|Walk_B_IP' || newAction.includes('Turn') || newAction === 'Arm_Dog|Attack_Bite') {
        actions[newAction].timeScale = 2.0;
      } else {
        actions[newAction].timeScale = 1.5;
      }
    };
    const handleMouseDown = () => {setIsMouseDown(true)
    };
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [actions, currentAction, ref, isMouseDown, keysPressed]);

  useFrame((state, delta) => {
    const impulse = { x: 0, y: 0, z: 0 };
    const linvel = ref.current.linvel();
    let rotationChange = 0;
    ref.current.resetForces(true)
    ref.current.resetTorques(true)
    const currentRotation = ref.current.rotation();
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(currentRotation);
    setIsRoated(false);
    // Calculate velocity magnitude
    const velocityMagnitude = Math.sqrt(linvel.x ** 2 + linvel.y ** 2 + linvel.z ** 2);
  
    if (keysPressed.current.w && velocityMagnitude < MAX_VEL) {
      
      impulse.x += forward.x * MOVEMENT_SPEED;
      // impulse.y += 0.1 * MOVEMENT_SPEED;
      impulse.z += forward.z * MOVEMENT_SPEED;
    } else if (keysPressed.current.s && velocityMagnitude < MAX_VEL) {
      impulse.x -= forward.x * MOVEMENT_SPEED;
      impulse.y -= forward.y * MOVEMENT_SPEED;
      impulse.z -= forward.z * MOVEMENT_SPEED;
    }
  
    if (keysPressed.current.a) {
      rotationChange += ROTATION_SPEED;
    }
    if (keysPressed.current.d) {
      rotationChange -= ROTATION_SPEED;
    }
  
    ref.current.applyImpulse(impulse, true);
  
    if (rotationChange !== 0) {
      setIsRoated(true)
      ref.current.applyTorqueImpulse({ x: 0, y: rotationChange, z: 0 }, true);
      // ref.current.setEnabledRotations(false,true,false,true);
    }else{
      ref.current.setAngvel({ x: 0, y: 0, z: 0 }, true);

    }
  
    // console.log(meshRef.current)
    // Ensure the dog stays above the ground
    const position = meshRef.current.getWorldPosition(new THREE.Vector3());
    // console.log(props.props[0])
    // console.log(new THREE.Vector3(position.x, position.y, position.z).distanceTo(new THREE.Vector3(0,0,-3)))
    if (!props.props[0]) {
      
      if(new THREE.Vector3(position.x, position.y, position.z).distanceTo(new THREE.Vector3(0,0,-3))<0.1){
      // if (keysPressed.current.enter){}

        props.props[1](!props.props[0])
      
    }
  }else{
    if (new THREE.Vector3(position.x, position.y, position.z).distanceTo(new THREE.Vector3(0,0,-5.1)) < 0.7) {
      if (keysPressed.current.enter) {
        setTargetCameraPosition(new THREE.Vector3(0, 0.82, -4.9));
        setCameraFlag(false);
        setLerpProgress(0);
      } 
      if (keysPressed.current.escape ) {
        if (curPage == null){
          keysPressed.current.escape = false;

  
        setCameraFlag(true);
        setLerpProgress(0);
        }else{
          props.props[5](null);
          console.log("fd")
          keysPressed.current.escape = false;
          setCameraFlag(false);
          setLerpProgress(0);
        }
      }
    }
    if(new THREE.Vector3(position.x, position.y, position.z).distanceTo(new THREE.Vector3(0,0,0))<2.6){
    
        props.props[1](!props.props[0])
      
    }
  }
    // position.y = Math.max(position.y, 0);
    // ref.current.setTranslation(position);

    // Check if any key is pressed, if not, switch to idle animation
    if (!keysPressed.current.w && !keysPressed.current.s && !keysPressed.current.a && !keysPressed.current.d && !keysPressed.current.enter) {
      if (currentAction !== 'Arm_Dog|Idle_1') {
        actions[currentAction]?.fadeOut(0.5);
        actions['Arm_Dog|Idle_1']?.reset().fadeIn(0.5).play();
        setCurrentAction('Arm_Dog|Idle_1');
      }
    }

    if (!isMouseDown) {
      const characterWorldPosition = meshRef.current.getWorldPosition(new THREE.Vector3());
      
      if (cameraFlag) {
        const dogRotation = ref.current.rotation();
        const baseCameraOffset = new THREE.Vector3(0, 1, 1);
        const finalCameraOffset = baseCameraOffset.applyQuaternion(dogRotation);
        setTargetCameraPosition(characterWorldPosition.clone().add(finalCameraOffset));
      }
  
      if (lerpProgress < 1) {
        setLerpProgress(Math.min(lerpProgress + delta * 2, 1)); // Adjust the multiplier to control transition speed
      }
  
      state.camera.position.lerp(targetCameraPosition, lerpProgress);
  
      if (cameraFlag) {
        state.camera.lookAt(characterWorldPosition);
        if (orbitControlsRef.current) {
          orbitControlsRef.current.target.copy(characterWorldPosition);
        }
      } else {
        const targetLookAt = new THREE.Vector3(0, 0.82, -5.7);
        state.camera.lookAt(targetLookAt);
      }

  }
  });

  return (
    <Suspense>
    <RigidBody ref={ref} colliders="hull" type="dynamic" gravityScale={10} linearDamping={10} angularDamping={100} enabledRotations={[false,isRotated,false]}>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        scale={0.1}
        position={[-1, 0, -2.8]}
        rotation={[-Math.PI / 2, Math.PI, 0]}
        castShadow
      />
    </RigidBody>
          <OrbitControls
          ref={orbitControlsRef}
          enabled={true}
          enablePan={false}
          enableZoom={true}
          minPolasAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
        </Suspense>
  );
});

export default DogModel;
