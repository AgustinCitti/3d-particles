varying vec3 vPosition;
attribute vec3 aRandom;

uniform float uTime;
uniform float uScale;

void main(){
     vPosition = position;

     float time = uTime * 4.;

     vec3 pos = position;
     
     pos.x *= uScale + (sin(pos.x * 4. + time) * (1. - uScale));
     pos.y *= uScale + (cos(pos.y * 4. + time) * (1. - uScale));
     pos.z *= uScale + (cos(pos.z * 4. + time) * (1. - uScale));

     pos.x += sin(uTime)* 0.01 * aRandom.x;
     pos.y += cos(uTime)* 0.01 * aRandom.y;
     pos.z += sin(uTime)* 0.01 * aRandom.z;

     vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
     gl_Position = projectionMatrix * mvPosition;
     gl_PointSize = 1.0 / -mvPosition.z;
}