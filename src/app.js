import * as THREE from 'three';

// Set the target date and time (January 12, 2025, 7:00 AM UTC)
const targetDate = new Date(Date.UTC(2025, 0, 12, 7, 0, 0)).getTime();

// Function to update the countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display the countdown
        document.getElementById("countdown").innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Repeat the function every second
        setTimeout(updateCountdown, 1000);
    } else {
        // Countdown has finished, hide the countdown and initialize the application
        document.getElementById("countdown").style.display = "none";
        initializeApplication();
    }
}

// Function to initialize the Three.js application
function initializeApplication() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a group for the carousel
    const carousel = new THREE.Group();
    scene.add(carousel);

    // Function to add a photo reel to the carousel
    function addPhotoToCarousel(imageUrl, index, total) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(imageUrl);
        let width = 3;
        let height = 4;
        if (imageUrl.includes("land")) {
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
        plane.position.x = Math.cos(angle) * 7.5;  // 7.5 is the radius of the carousel
        plane.position.z = Math.sin(angle) * 7.5;

        // Rotate the image to always face the center
        plane.lookAt(0, 0, 0);

        carousel.add(plane);
    }

    // Populate the carousel with images
    const numImages = 20;
    for (let i = 0; i < numImages; i++) {
        const imageUrl = i === 0 ? `land_${i + 1}.jpg` : `${i + 1}.jpg`;
        addPhotoToCarousel(imageUrl, i, numImages);
    }

    // Rotate the carousel
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the carousel horizontally around the Y-axis
        carousel.rotation.y += 0.0015;

        carousel.children.forEach(plane => {
            // Calculate dot product to determine visibility
            const cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection);
            const direction = new THREE.Vector3();
            plane.getWorldDirection(direction);
            direction.y = carousel.rotation.y;
            const dot = cameraDirection.dot(direction);
            // Adjust material based on the dot product
            plane.material.opacity = dot > 0.2 ? 1 : 0.1;
        });

        renderer.render(scene, camera);
    }

    animate();
}

// Start the countdown
updateCountdown();