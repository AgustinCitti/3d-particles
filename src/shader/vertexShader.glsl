void main(){
     vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
     gl_Position = projectionMatrix * mvPosition;
     gl_PointSize = 4.0 / -mvPosition.z;
}