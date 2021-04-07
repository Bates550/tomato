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
directionalLight.position.x = 2;
scene.add(directionalLight);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

var gui = new dat.GUI({ name: "My GUI" });
// gui.add(cube.rotation, "x", 0, 2 * Math.PI);
// gui.add(cube.rotation, "y", 0, 2 * Math.PI);
// gui.add(cube.rotation, "z", 0, 2 * Math.PI);

// gui.add(cube.position, "x", -4, 4);
// gui.add(cube.position, "y", -4, 4);
// gui.add(cube.position, "z", -4, 4);

const geometry = new THREE.PlaneGeometry(20, 20, 32);
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI / 2;
scene.add(plane);

const state = {
  time: 1,
};

const curve = new THREE.LineCurve3(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 4, 0)
);
const geometry1 = new THREE.TubeGeometry(curve, 20, 2, 8, true);
// geometry1.translate(0, 2, 0);
const material1 = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const tube = new THREE.Mesh(geometry1, material1);
scene.add(tube);

gui.add(tube.scale, "y", 0.1, 5);
gui.add(tube.position, "y", 0, 4);
gui.add(state, "time", 1, 100).onChange(() => {
  setTimeout(() => {
    console.log(state.time, tube.scale.y, tube.position.y);
  }, 100);
});

const controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 20);
controls.update();

const animate = function () {
  requestAnimationFrame(animate);

  tube.scale.y = 1 + state.time * 0.1;
  // tube.position.y = (tube.scale.y - 1) / 2 * 4;

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
};

animate();
