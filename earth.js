import * as THREE from "three"
import {OrbitControls} from  "jsm/controls/OrbitControls.js"; 

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);
const detail = 12;
const Loader = new THREE.TextureLoader();
const geo = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: Loader.load("./earth.jpg"),
  specularMap: Loader.load("./earth_spec.jpg"),
  bumpMap: Loader.load("./earth_bump.jpg"),
  bumpScale: 0.04,
});
material.map.colorSpace = THREE.SRGBColorSpace;
const earthMesh = new THREE.Mesh(geo, material);
earthGroup.add(earthMesh);


const lightsMat = new THREE.MeshBasicMaterial({
map: Loader.load("./earth_lights.jpg"),
blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geo, lightsMat);
earthGroup.add(lightsMesh);


const cloudsMat = new THREE.MeshStandardMaterial({
map: Loader.load("./earth_clouds.jpg"),
transparent: true,
opacity: 0.8,
blending: THREE.AdditiveBlending,
alphaMap: Loader.load('./earth_clouds_trans.jpg'),
});
const cloudsMesh = new THREE.Mesh(geo, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

function animate(t=0){
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.002;
    lightsMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.0025;
    renderer.render(scene,camera);
    controls.update();
}
animate();
renderer.render(scene,camera)
function handleWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', handleWindowResize, false);
