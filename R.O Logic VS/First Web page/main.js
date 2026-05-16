import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const mount = document.getElementById("app");

if (!mount) {
  throw new Error('Missing <div id="app"></div> in index.html');
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  28,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 14);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
mount.appendChild(renderer.domElement);

// lighting
const ambient = new THREE.AmbientLight(0xffffff, 1.4);
scene.add(ambient);

const key = new THREE.DirectionalLight(0xffffff, 2.2);
key.position.set(6, 6, 10);
scene.add(key);

const rim = new THREE.DirectionalLight(0xffffff, 1.1);
rim.position.set(-6, 2, -8);
scene.add(rim);

// material
const steel = new THREE.MeshStandardMaterial({
  color: 0xc7cbd0,
  metalness: 0.9,
  roughness: 0.32
});

// rocket group
const rocket = new THREE.Group();
scene.add(rocket);

// body
const body = new THREE.Mesh(
  new THREE.CylinderGeometry(0.42, 0.48, 6.3, 64),
  steel
);
rocket.add(body);

// nose
const nose = new THREE.Mesh(
  new THREE.ConeGeometry(0.42, 1.15, 64),
  steel
);
nose.position.y = 3.72;
rocket.add(nose);

// upper flaps
const flapGeom = new THREE.BoxGeometry(0.06, 0.95, 0.42);

const flapL = new THREE.Mesh(flapGeom, steel);
flapL.position.set(-0.5, 3.12, 0);
flapL.rotation.z = -0.65;
rocket.add(flapL);

const flapR = new THREE.Mesh(flapGeom, steel);
flapR.position.set(0.5, 3.12, 0);
flapR.rotation.z = 0.65;
rocket.add(flapR);

// lower flaps
const lowerGeom = new THREE.BoxGeometry(0.08, 1.2, 0.5);

const lowerL = new THREE.Mesh(lowerGeom, steel);
lowerL.position.set(-0.62, -2.3, 0);
lowerL.rotation.z = -0.18;
rocket.add(lowerL);

const lowerR = new THREE.Mesh(lowerGeom, steel);
lowerR.position.set(0.62, -2.3, 0);
lowerR.rotation.z = 0.18;
rocket.add(lowerR);

// engine skirt
const skirt = new THREE.Mesh(
  new THREE.CylinderGeometry(0.55, 0.5, 0.42, 64),
  steel
);
skirt.position.y = -3.35;
rocket.add(skirt);

rocket.position.set(2.2, -0.15, 0);
rocket.scale.set(0.72, 0.72, 0.72);

const mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  rocket.rotation.y += 0.004;
  rocket.rotation.x = mouse.y * 0.025;
  rocket.rotation.z = mouse.x * 0.015;

  renderer.render(scene, camera);
}

animate();