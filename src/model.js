import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';
import {MeshSurfaceSampler} from 'three/examples/jsm/math/MeshSurfaceSampler';
import vertex from './shader/vertexShader.glsl';
import fragment from './shader/fragmentShader.glsl';


class Model {
    constructor(obj) {
    console.log(obj)
    this.name = obj.name;
    this.file = obj.file;
    this.scene = obj.scene;
    this.isLoaded = false;
    this.mesh = null;
    this.particleSystem = null;
    this.color1 = obj.color1;
    this.color2 = obj.color2;
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
          
        });

        this.mesh.material = this.material;
        
        //Geometry mesh
        this.geometry = this.mesh.geometry;

        //particles material
        //this.particlesMaterial = new THREE.PointsMaterial({
        //    color: 0x008000,
        //    size: 0.001,
        //    sizeAttenuation: true,
        //    alphaTest: 0.5,
        //    transparent: true
        //});

        this.particlesMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uColor1: { value: new THREE.Color(this.color1) },
                uColor2: { value: new THREE.Color(this.color2) },
                uTime: { value: 0 },
            },

            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })


        //particles geometry
        const sampler = new MeshSurfaceSampler(this.mesh).build();
        const numParticles = 20000;
        this.particlesGeometry = new THREE.BufferGeometry();
        const particlesPosition = new Float32Array(numParticles * 3);

        for(let i = 0; i < numParticles; i++) {
            const newPosition = new THREE.Vector3();
            sampler.sample(newPosition);
            particlesPosition[i * 3] = newPosition.x;
            particlesPosition[i * 3 + 1] = newPosition.y;
            particlesPosition[i * 3 + 2] = newPosition.z;
        }

        this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));

        //particle system
        this.particleSystem = new THREE.Points(this.particlesGeometry, this.particlesMaterial);
        
        // Copy position, rotation and scale from original mesh
        this.particleSystem.position.copy(this.mesh.position);
        this.particleSystem.rotation.copy(this.mesh.rotation);
        this.particleSystem.scale.copy(this.mesh.scale);
        
        this.isLoaded = true;

        if(this.placeOnLoad) {
            this.add();
        }
       }, 
       // Progress callback
       (xhr) => {
         console.log(`${this.name} ${Math.floor(xhr.loaded / xhr.total * 100)}% loaded`);
       },
       // Error callback
       (error) => {
         console.error(`Error loading model ${this.name}:`, error);
       })
    }

    add() {
        if (this.isLoaded) {
            // Only add particle system, not the wireframe mesh
            if (this.particleSystem) {
                this.scene.add(this.particleSystem);
            }
        } else {
            console.log(`Model ${this.name} not loaded yet. It will be added when loading completes.`);
            this.placeOnLoad = true;
        }
    }
    
    remove() {
        if (this.isLoaded) {
            // Only remove particle system
            if (this.particleSystem) {
                this.scene.remove(this.particleSystem);
            }
        }
    }

    update() {
        // No animation needed with simple shaders
    }
}
export default Model;