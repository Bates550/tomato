const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var gui = new dat.GUI({ name: "My GUI" });
gui.add(cube.rotation, "x", 0, 2 * Math.PI);
gui.add(cube.rotation, "y", 0, 2 * Math.PI);
gui.add(cube.rotation, "z", 0, 2 * Math.PI);

gui.add(cube.position, "x", -4, 4);
gui.add(cube.position, "y", -4, 4);
gui.add(cube.position, "z", -4, 4);

const animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};

animate();
