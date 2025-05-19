varying vec3 vPosition;

void main(){
     vPosition = position;

     vec3 pos = position;
     pos *= 2.0;

     vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
     gl_Position = projectionMatrix * mvPosition;
     gl_PointSize = 8.0 / -mvPosition.z;
}