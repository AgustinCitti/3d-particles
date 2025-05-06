import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';


class Model {
    constructor(obj) {
    console.log(obj)
    this.name = obj.name;
    this.file = obj.file;
    this.scene = obj.scene;

    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('draco/');
    this.loader.setDRACOLoader(this.dracoLoader);
    this.placeOnLoad = obj.placeOnLoad;

    this.init();
    }

    init() {
       this.loader.load(this.file, (response) => {
        console.log(response)

        this.mesh = response.scene.children[0];
        this.material = new THREE.MeshStandardMaterial({
            color: 0xff0000, // Red in hex
            wireframe: true,
            metalness: 0.3,
            roughness: 0.4
        });

        this.mesh.material = this.material;

        if(this.placeOnLoad) {
            this.add();
        }
       })
    }

    add() {
        this.scene.add(this.mesh);
    }
    remove() {
        this.scene.remove(this.mesh);
    }
}
export default Model;