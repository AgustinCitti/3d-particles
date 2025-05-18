import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from './model'

/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


/*------------------------------
Scene & Camera
------------------------------*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
  50, 
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 1;
camera.position.y = 1;


/*------------------------------
Lighting
------------------------------*/
// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 5, 3);
scene.add(directionalLight);


/*------------------------------
Mesh
------------------------------*/
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial( { 
  color: 0x00ff00,
} );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );


/*------------------------------
OrbitControls
------------------------------*/
const controls = new OrbitControls( camera, renderer.domElement );


/*------------------------------
Helpers
------------------------------*/
//const gridHelper = new THREE.GridHelper( 10, 10 );
//scene.add( gridHelper );
//const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );


/*------------------------------
Model
------------------------------*/
const skull = new Model({
  name: 'skull',
  file: 'models/skull.glb',
  scene: scene,
  placeOnLoad: true
});

const horse = new Model({
  name: 'horse',
  file: 'models/horse.glb',
  scene: scene
});

/*------------------------------
Controllers
------------------------------*/
// Get the controllers element by its ID
const controllersElement = document.getElementById('controllers');
const buttons = controllersElement.querySelectorAll('.button');

buttons[0].addEventListener('click', () => {
  skull.add();
  horse.remove();
});

buttons[1].addEventListener('click', () => {
  skull.remove();
  horse.add();
});


/*------------------------------
Loop
------------------------------*/
const animate = function () {
  requestAnimationFrame( animate );
  
  // Update models
  skull.update();
  horse.update();
  
  // Render scene
  renderer.render( scene, camera );
};
animate();


/*------------------------------
Resize
------------------------------*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );