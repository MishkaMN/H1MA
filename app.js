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
const reel1 = loadPhotoReel('path/to/photo1.jpg', 1, 2);
const reel2 = loadPhotoReel('path/to/photo2.jpg', 1, 2);
reel2.position.x = 3;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    reel1.rotation.y += 0.01;
    reel2.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
