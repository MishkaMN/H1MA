import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// Create a group for the carousel
const carousel = new THREE.Group();
scene.add(carousel);

// Function to add a photo reel to the carousel
function addPhotoToCarousel(imageUrl, index, total) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);
    let width = 3;
    let height = 4;
    if (imageUrl.includes("land")){
        width = 4;
        height = 3;
    }
    const geometry = new THREE.PlaneGeometry(width, height);  // Use a plane for each image
    geometry.scale(-1, 1, 1); // Flips the geometry along the X-axis
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
    });
    const plane = new THREE.Mesh(geometry, material);

    // Calculate the angle and position for each image
    const angle = (index / total) * 2 * Math.PI;
    plane.position.x = Math.cos(angle) * 7.5;  // 5 is the radius of the carousel
    plane.position.z = Math.sin(angle) * 7.5;

    // Rotate the image to always face the center
    plane.lookAt(0 ,0, 0);

    carousel.add(plane);
}

// Populate the carousel with images
const numImages = 10;
for (let i = 0; i < numImages; i++) {
    if ( i == 0)
    {
        addPhotoToCarousel(`land_${i + 1}.jpg`, i, numImages);
    }
    else{
        addPhotoToCarousel(`${i + 1}.jpg`, i, numImages);
    }
}
for (let i = 0; i < numImages; i++) {
    
}

// Rotate the carousel
function animate() {
    requestAnimationFrame(animate);

    // Rotate the carousel horizontally around the Y-axis
    carousel.rotation.y += 0.0015;

    carousel.children.forEach(plane => {
        //plane.lookAt(camera.position);

        // Calculate dot product to determine visibility
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        const direction = new THREE.Vector3();
        plane.getWorldDirection(direction);
        direction.y = carousel.rotation.y
        const dot = cameraDirection.dot(direction);
        // Adjust material based on the dot product
        if (dot > 0.2) {
            // Plane is facing towards the camera
            plane.material.opacity = 1;
            //plane.material.color.setHex(0xFFFFFF);  // Original color
        } else {
            // Plane is facing away from the camera
            plane.material.opacity = 0.1;  // Make it nearly invisible or adjust as needed
            //plane.material.color.setHex(0x000000);  // Black color
        }
    });

    renderer.render(scene, camera);
}

animate();