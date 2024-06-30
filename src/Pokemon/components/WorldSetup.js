import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const createWorld = (scene, assets, createGrassPatch, GRASS_COUNT) => {
  const ground = new THREE.Mesh(
    new THREE.CylinderGeometry(25.0, 25.0, 0.01, 64),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(assets.debugFloor),
    })
  );
  ground.position.y = -2.0;
  ground.receiveShadow = true;

  const lightPrimary = new THREE.PointLight(0xffffff, 1.0, 10.0);
  lightPrimary.position.set(2.0, 2.0, 2.0);
  lightPrimary.castShadow = true;

  const lightSecondary = new THREE.PointLight(0x8888ff, 1.0, 10.0);
  lightSecondary.position.set(-2.0, 2.0, -2.0);
  lightSecondary.castShadow = true;

  scene.add(ground);
  scene.add(lightPrimary);
  scene.add(lightSecondary);

  const player = new THREE.Group();
  new GLTFLoader().load(assets.pokeballModel, (gltf) => {
    gltf.scene.scale.setScalar(0.25);
    player.add(gltf.scene);
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(0.0, 0.0);

  setInterval(() => {
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObject(ground, true);

    if (!hits.length) {
      return;
    }

    const target = new THREE.Vector3().copy(hits[0].point);
    target.y += 1.0;

    const oldPosition = player.position.clone();

    player.position.lerp(target, 0.1);

    const deltaX = oldPosition.x - player.position.x;
    const deltaZ = oldPosition.z - player.position.z;

    player.rotation.z += deltaX;
    player.rotation.x -= deltaZ;

    if (grassStuff) {
      grassStuff.mesh.material.uniforms.vPlayerPosition.value.copy(player.position);
    }
  }, 1000 / 60);

  scene.add(player);

  for (let i = 0; i < GRASS_COUNT; i++) {
    createGrassPatch(
      new THREE.Vector3().randomDirection()
        .multiply(new THREE.Vector3(1.0, 0.0, 1.0))
        .multiplyScalar(10.0),
      new THREE.Euler(0.0, Math.random() * Math.PI * 2.0, 0.0),
      new THREE.Vector3().setScalar(Math.random() * 0.25 + 0.25)
    );
  }
};

export default createWorld;
