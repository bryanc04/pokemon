import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CameraController = ({ targetRef }) => {

  useFrame(({ camera }) => {
    if (targetRef.current) {
      const characterWorldPosition = character.current.getWorldPosition(
        new THREE.Vector3()
      );
      camera.position.x = characterWorldPosition.x;
      camera.position.z = characterWorldPosition.z + 1;
  
      const targetLookAt = new THREE.Vector3(
        characterWorldPosition.x,
        0,
        characterWorldPosition.z
      );
  
      camera.lookAt(targetLookAt);
    }
  });

  return null;
};

export default CameraController;