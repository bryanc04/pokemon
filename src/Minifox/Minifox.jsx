import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  Gltf,
  Environment,
  Fisheye,
  KeyboardControls,
} from "@react-three/drei";
import Controller from "ecctrl";
import Ecctrl from "ecctrl";

export default function Minifox() {
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];
  return (
    <Canvas shadows onPointerDown={(e) => e.target.requestPointerLock()}>
      <Environment files="/assets/night.hdr" ground={{ scale: 100 }} />
      <directionalLight
        intensity={0.7}
        castShadow
        shadow-bias={-0.0004}
        position={[-20, 20, 20]}
      >
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
      </directionalLight>
      <ambientLight intensity={0.2} />
      <Physics timeStep="vary">
        <KeyboardControls map={keyboardMap}>
          <Ecctrl
            mode="FixedCamera"
            camTargetPos={{ x: 0, y: 1.5, z: 0 }}
            camInitDis={-5}
          >
            <Gltf
              castShadow
              receiveShadow
              scale={1.5}
              position={[0, 1, 0]}
              src="/assets/shiba.glb"
            />
          </Ecctrl>
        </KeyboardControls>
        <RigidBody type="fixed" colliders="trimesh">
          <Gltf
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            position={[0, -1, 0]}
            scale={3}
            src="/assets/temple.glb"
          />
        </RigidBody>
      </Physics>
    </Canvas>
  );
}
