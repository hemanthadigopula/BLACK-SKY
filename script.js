// ===== BLACK SKY - JavaScript for Animations and 3D Objects =====

// ===== SMOOTH SCROLL FUNCTION =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// ===== PARTICLE SYSTEM =====
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Style particle
        particle.style.position = 'absolute';
        particle.style.background = 'rgba(0, 212, 255, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.animation = 'float ' + particle.style.animationDuration + ' ease-in-out infinite';
        particle.style.animationDelay = particle.style.animationDelay;
        particle.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.8)';
        
        container.appendChild(particle);
    }
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

// ===== 3D GALAXY VISUALIZATION USING THREE.JS =====
function create3DGalaxy() {
    const container = document.getElementById('galaxy-container');
    if (!container) return;

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create galaxy particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Spiral galaxy shape
        const radius = Math.random() * 5;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;

        posArray[i] = x;
        posArray[i + 1] = y;
        posArray[i + 2] = z;

        // Colors (cyan to purple gradient)
        colorsArray[i] = 0 + Math.random() * 0.6;     // R
        colorsArray[i + 1] = 0.8 + Math.random() * 0.2; // G
        colorsArray[i + 2] = 1;                         // B
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 8;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.002;
        particlesMesh.rotation.x += 0.001;
        renderer.render(scene, camera);
    }
    animate();
}

// ===== SCROLL ANIMATIONS =====
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(section);
    });
}

// ===== CURSOR TRAIL EFFECT =====
function createCursorTrail() {
    let cursorTrails = [];
    
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        trail.style.position = 'absolute';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.borderRadius = '50%';
        trail.style.background = 'rgba(0, 212, 255, 0.5)';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.animation = 'trailFade 0.8s ease-out forwards';
        
        document.body.appendChild(trail);
        cursorTrails.push(trail);
        
        setTimeout(() => {
            trail.remove();
            cursorTrails.shift();
        }, 800);
    });
}

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// ===== PARALLAX EFFECT =====
function createParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section-title, .section-subtitle');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed * 0.05}px)`;
        });
    });
}

// ===== MOUSE TRACKING FOR CLOSING SECTION =====
function createMirrorEffect() {
    const closingSection = document.getElementById('closing');
    const mirror = document.querySelector('.mirror-reflection');
    
    if (closingSection && mirror) {
        closingSection.addEventListener('mousemove', (e) => {
            const rect = closingSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            mirror.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.3) 0%, transparent 50%)`;
        });
    }
}

// ===== PROJECT STARS INTERACTION =====
function initProjectStars() {
    const projectStars = document.querySelectorAll('.project-star');
    
    projectStars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            this.querySelector('.star-glow').style.transform = 'scale(1.5)';
            this.querySelector('.star-glow').style.transition = 'transform 0.3s ease';
        });
        
        star.addEventListener('mouseleave', function() {
            this.querySelector('.star-glow').style.transform = 'scale(1)';
        });
    });
}

// ===== TYPING EFFECT FOR QUOTES =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ===== INITIALIZE ALL ON LOAD =====
window.addEventListener('DOMContentLoaded', () => {
    // Create particles
    createParticles();
    
    // Create 3D galaxy (wait for Three.js to load)
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            create3DGalaxy();
        }
    }, 500);
    
    // Initialize scroll animations
    handleScrollAnimations();
    
    // Create cursor trail
    createCursorTrail();
    
    // Parallax effect
    createParallaxEffect();
    
    // Mirror effect
    createMirrorEffect();
    
    // Project stars interaction
    initProjectStars();
    
    // Log welcome message
    console.log('%c BLACK SKY ', 'background: #000; color: #00d4ff; font-size: 30px; font-weight: bold; padding: 10px;');
    console.log('%c An Infinite Possibility that I Am ', 'background: #000; color: #9d4edd; font-size: 16px; padding: 5px;');
});

// ===== SMOOTH REVEAL ON SCROLL =====
window.addEventListener('scroll', () => {
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// ===== RESPONSIVE THREE.JS =====
window.addEventListener('resize', () => {
    const container = document.getElementById('galaxy-container');
    if (container && container.querySelector('canvas')) {
        const canvas = container.querySelector('canvas');
        const size = Math.min(window.innerWidth * 0.8, 400);
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
    }
});
