// Setup scene
const scene = new THREE.Scene();

// Setup camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Load textures and create 3D photo reels
const loadPhotoReel = (imageUrl, radius, height) => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    return cylinder;
};

// Example usage
const reel1 = loadPhotoReel('docs/1.jpg', 1, 2);
const reel2 = loadPhotoReel('docs/2.jpg', 1, 2);
const reel3 = loadPhotoReel('docs/3.jpg', 1, 2);
const reel4 = loadPhotoReel('docs/4.jpg', 1, 2);
const reel5 = loadPhotoReel('docs/5.jpg', 1, 2);
const reel6 = loadPhotoReel('docs/6.jpg', 1, 2);
const reel7 = loadPhotoReel('docs/7.jpg', 1, 2);
const reel8 = loadPhotoReel('docs/8.jpg', 1, 2);
const reel9 = loadPhotoReel('docs/9.jpg', 1, 2);
const reel10 = loadPhotoReel('docs/10.jpg', 1, 2);

reel1.position.x = 3;
reel2.position.x = 3;
reel3.position.x = 3;
reel4.position.x = 3;
reel5.position.x = 3;
reel6.position.x = 3;
reel7.position.x = 3;
reel8.position.x = 3;
reel9.position.x = 3;
reel10.position.x = 3;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    reel1.rotation.y += 0.01;
    reel2.rotation.y += 0.01;
    reel3.rotation.y += 0.01;
    reel4.rotation.y += 0.01;
    reel5.rotation.y += 0.01;
    reel6.rotation.y += 0.01;
    reel7.rotation.y += 0.01;
    reel8.rotation.y += 0.01;
    reel9.rotation.y += 0.01;
    reel10.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
