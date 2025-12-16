// Stars Canvas Animation
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
let shootingStars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

function initStars() {
    stars = [];
    const numStars = Math.floor((canvas.width * canvas.height) / 3000);

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.02
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw regular stars
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Twinkle effect
        star.opacity += star.twinkleSpeed;
        if (star.opacity >= 1 || star.opacity <= 0.2) {
            star.twinkleSpeed = -star.twinkleSpeed;
        }
    });

    // Draw shooting stars
    shootingStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y + star.length);
        ctx.strokeStyle = `rgba(139, 92, 246, ${star.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        star.x += star.speed;
        star.y += star.speed;
        star.opacity -= 0.01;

        if (star.opacity <= 0) {
            shootingStars.splice(index, 1);
        }
    });

    requestAnimationFrame(drawStars);
}

function createShootingStar() {
    if (Math.random() < 0.003) {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,
            length: Math.random() * 80 + 20,
            speed: Math.random() * 8 + 4,
            opacity: 1
        });
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function animate() {
    drawStars();
    createShootingStar();
}

animate();

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    // Since we're keeping the dark theme, this could toggle between dark variations
    document.body.style.transition = 'background-color 0.3s ease';
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Copy Email Functionality
const copyEmailBtn = document.getElementById('copyEmail');
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
        const email = 'nilesh.vernekar11@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const originalText = copyEmailBtn.innerHTML;
            copyEmailBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.6666 5L7.49998 14.1667L3.33331 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Copied!</span>';

            setTimeout(() => {
                copyEmailBtn.innerHTML = originalText;
            }, 2000);
        });
    });
}

// Copy Email Functionality for Bento Layout
const copyEmailBtnBento = document.getElementById('copyEmailBento');
if (copyEmailBtnBento) {
    copyEmailBtnBento.addEventListener('click', () => {
        const email = 'nilesh.vernekar11@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const originalText = copyEmailBtnBento.innerHTML;
            copyEmailBtnBento.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.6666 5L7.49998 14.1667L3.33331 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Copied!</span>';

            setTimeout(() => {
                copyEmailBtnBento.innerHTML = originalText;
            }, 2000);
        });
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .hero-app-card, .highlight-card, .timeline-item, .bento-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert(`Thank you for your message, ${name}! I'll get back to you soon at ${email}.`);
    contactForm.reset();

    // In a real application, you would use something like:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     body: JSON.stringify({ name, email, message }),
    //     headers: { 'Content-Type': 'application/json' }
    // })
});

// Parallax effect for hero section on mouse move
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX) / 100;
        const y = (window.innerHeight - e.pageY) / 100;

        hero.style.transform = `translate(${x}px, ${y}px)`;
    });

    hero.addEventListener('mouseleave', () => {
        hero.style.transform = 'translate(0, 0)';
    });
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.project-card, .timeline-item, .highlight-card');

const reveal = () => {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Add CSS for revealed state
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Cursor glow effect
document.addEventListener('mousemove', (e) => {
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.width = '200px';
    glow.style.height = '200px';
    glow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)';
    glow.style.pointerEvents = 'none';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.zIndex = '0';
    glow.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(glow);

    setTimeout(() => {
        glow.style.opacity = '0';
        setTimeout(() => {
            glow.remove();
        }, 300);
    }, 100);
});

// Button hover effects
document.querySelectorAll('.btn-primary, .project-card, .highlight-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

console.log('Portfolio website loaded successfully! 🚀');

// App Slider State - Enhanced
const sliderStates = {};
const autoPlayIntervals = {};

// Initialize sliders with all features
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.app-slider').forEach(slider => {
        const card = slider.closest('.hero-app-card');
        const appName = card.dataset.app;
        if (!appName) return;

        const track = slider.querySelector('.app-slider-track');
        const images = track.querySelectorAll('.app-screenshot');
        const dotsContainer = slider.querySelector('.slider-dots');

        // Initialize state
        sliderStates[appName] = {
            currentIndex: 0,
            totalSlides: images.length,
            isPlaying: false,
            touchStartX: 0,
            touchEndX: 0
        };

        // Create dots
        for (let i = 0; i < images.length; i++) {
            const dot = document.createElement('div');
            dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
            dot.onclick = () => slideApp(appName, null, i);
            dotsContainer.appendChild(dot);
        }

        // Create slide counter
        const counter = document.createElement('div');
        counter.className = 'slider-counter';
        counter.textContent = `1 / ${images.length}`;
        slider.appendChild(counter);

        // Create play/pause button
        const playPauseBtn = document.createElement('button');
        playPauseBtn.className = 'slider-play-pause';
        playPauseBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
        playPauseBtn.onclick = (e) => {
            e.stopPropagation();
            toggleAutoPlay(appName);
        };
        slider.appendChild(playPauseBtn);

        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'slider-progress';
        slider.appendChild(progressBar);

        // Touch gesture support
        setupTouchGestures(slider, appName);

        // Keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                slideApp(appName, -1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                slideApp(appName, 1);
            }
        });

        // Pause auto-play on hover
        card.addEventListener('mouseenter', () => {
            if (sliderStates[appName].isPlaying) {
                pauseAutoPlay(appName);
            }
        });

        card.addEventListener('mouseleave', () => {
            if (sliderStates[appName].isPlaying) {
                startAutoPlay(appName);
            }
        });

        // Image lazy loading
        images.forEach((img, index) => {
            if (index === 0) {
                img.removeAttribute('data-loading');
            } else {
                img.setAttribute('loading', 'lazy');
            }
        });
    });
});

// Slide app screenshots with enhanced animations
function slideApp(appName, direction, targetIndex = null) {
    const state = sliderStates[appName];
    if (!state) return;

    const previousIndex = state.currentIndex;

    if (targetIndex !== null) {
        state.currentIndex = targetIndex;
    } else {
        state.currentIndex += direction;
        if (state.currentIndex < 0) state.currentIndex = state.totalSlides - 1;
        if (state.currentIndex >= state.totalSlides) state.currentIndex = 0;
    }

    const card = document.querySelector(`[data-app="${appName}"]`);
    const slider = card.querySelector('.app-slider');
    const track = slider.querySelector('.app-slider-track');
    const dots = slider.querySelectorAll('.slider-dot');
    const counter = slider.querySelector('.slider-counter');

    // Animate transition
    track.style.transform = `translateX(-${state.currentIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === state.currentIndex);
    });

    // Update counter
    if (counter) {
        counter.textContent = `${state.currentIndex + 1} / ${state.totalSlides}`;
    }

    // Add transition effect
    const currentImage = track.children[state.currentIndex];
    if (currentImage) {
        currentImage.style.animation = 'fadeInSlide 0.5s ease-out';
        setTimeout(() => {
            currentImage.style.animation = '';
        }, 500);
    }
}

// Touch gesture support
function setupTouchGestures(slider, appName) {
    const state = sliderStates[appName];

    slider.addEventListener('touchstart', (e) => {
        state.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        state.touchEndX = e.changedTouches[0].screenX;
        handleSwipe(appName);
    }, { passive: true });

    // Mouse drag support for desktop
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    slider.addEventListener('mousedown', (e) => {
        if (e.target.closest('.slider-btn, .slider-dot, .slider-play-pause')) return;
        isDragging = true;
        startX = e.clientX;
        slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        const diff = currentX - startX;
        if (Math.abs(diff) > 50) {
            slideApp(appName, diff > 0 ? -1 : 1);
            isDragging = false;
            slider.style.cursor = 'grab';
        }
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
        slider.style.cursor = 'default';
    });

    slider.addEventListener('mouseleave', () => {
        isDragging = false;
        slider.style.cursor = 'default';
    });
}

function handleSwipe(appName) {
    const state = sliderStates[appName];
    const swipeThreshold = 50;
    const diff = state.touchStartX - state.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            slideApp(appName, 1);
        } else {
            slideApp(appName, -1);
        }
    }
}

// Auto-play functionality
function toggleAutoPlay(appName) {
    const state = sliderStates[appName];
    if (!state) return;

    const card = document.querySelector(`[data-app="${appName}"]`);
    const playPauseBtn = card.querySelector('.slider-play-pause');
    const slider = card.querySelector('.app-slider');

    if (state.isPlaying) {
        stopAutoPlay(appName);
        playPauseBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
        slider.classList.remove('playing');
    } else {
        startAutoPlay(appName);
        playPauseBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
        `;
        slider.classList.add('playing');
    }
}

function startAutoPlay(appName) {
    const state = sliderStates[appName];
    if (!state) return;

    state.isPlaying = true;
    autoPlayIntervals[appName] = setInterval(() => {
        slideApp(appName, 1);
    }, 5000);
}

function pauseAutoPlay(appName) {
    if (autoPlayIntervals[appName]) {
        clearInterval(autoPlayIntervals[appName]);
        delete autoPlayIntervals[appName];
    }
}

function stopAutoPlay(appName) {
    const state = sliderStates[appName];
    if (!state) return;

    state.isPlaying = false;
    pauseAutoPlay(appName);
}

// Add fade in animation
const fadeInSlideStyle = document.createElement('style');
fadeInSlideStyle.textContent = `
    @keyframes fadeInSlide {
        from {
            opacity: 0.7;
            transform: scale(0.98);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(fadeInSlideStyle);

// Gallery Modal Functionality
const galleryData = {
    'verizon-protect': {
        title: 'Verizon Protect',
        images: [
            'images/apps/verizon-protect/screenshot-1.jpg',
            'images/apps/verizon-protect/screenshot-2.jpg',
            'images/apps/verizon-protect/screenshot-3.jpg',
            'images/apps/verizon-protect/screenshot-4.jpg'
        ]
    },
    'starbucks': {
        title: 'Starbucks UAE',
        images: [
            'images/apps/starbucks/screenshot-1.jpg',
            'images/apps/starbucks/screenshot-2.jpg',
            'images/apps/starbucks/screenshot-3.jpg'
        ]
    },
    'tim-hortons': {
        title: 'Tim Hortons',
        images: [
            'images/apps/tim-hortons/screenshot-1.jpg',
            'images/apps/tim-hortons/screenshot-2.jpg',
            'images/apps/tim-hortons/screenshot-3.jpg',
            'images/apps/tim-hortons/screenshot-4.jpg'
        ]
    },
    'viya': {
        title: 'Viya',
        images: [
            'images/apps/viya/screenshot-1.jpg',
            'images/apps/viya/screenshot-2.jpg',
            'images/apps/viya/screenshot-3.jpg',
            'images/apps/viya/screenshot-4.jpg'
        ]
    },
    'club-apparel': {
        title: 'Club Apparel',
        images: [
            'images/apps/club-apparel/screenshot-1.jpg',
            'images/apps/club-apparel/screenshot-2.jpg',
            'images/apps/club-apparel/screenshot-3.jpg',
            'images/apps/club-apparel/screenshot-4.jpg',
            'images/apps/club-apparel/screenshot-5.jpg'
        ]
    },
    'hear-com': {
        title: 'Hear.com Horizon',
        images: [
            'images/apps/hear-com/screenshot-1.jpg',
            'images/apps/hear-com/screenshot-2.jpg',
            'images/apps/hear-com/screenshot-3.jpg',
            'images/apps/hear-com/screenshot-4.jpg',
            'images/apps/hear-com/screenshot-5.jpg',
            'images/apps/hear-com/screenshot-6.jpg'
        ]
    }
};

let currentGallery = null;
let currentSlideIndex = 0;

function openGallery(appName) {
    const gallery = galleryData[appName];
    if (!gallery) return;

    currentGallery = gallery;
    currentSlideIndex = 0;

    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryTitle');
    const dotsContainer = document.getElementById('galleryDots');

    title.textContent = gallery.title;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Create dots
    dotsContainer.innerHTML = '';
    gallery.images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'gallery-dot';
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    showSlide(0);
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentGallery = null;
}

function changeSlide(direction) {
    if (!currentGallery) return;
    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
        currentSlideIndex = currentGallery.images.length - 1;
    } else if (currentSlideIndex >= currentGallery.images.length) {
        currentSlideIndex = 0;
    }

    showSlide(currentSlideIndex);
}

function goToSlide(index) {
    currentSlideIndex = index;
    showSlide(index);
}

function showSlide(index) {
    if (!currentGallery) return;

    const image = document.getElementById('galleryImage');
    const dots = document.querySelectorAll('.gallery-dot');

    image.src = currentGallery.images[index];

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (!currentGallery) return;

    if (e.key === 'Escape') {
        closeGallery();
    } else if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Close gallery when clicking outside
document.getElementById('galleryModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'galleryModal') {
        closeGallery();
    }
});

// Animated Globe Implementation
class Globe {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.rotation = 0;
        this.autoRotate = true;
        this.isDragging = false;

        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    }

    createParticles() {
        this.particles = [];
        const numParticles = 800;

        for (let i = 0; i < numParticles; i++) {
            // Use Fibonacci sphere algorithm for even distribution
            const phi = Math.acos(1 - 2 * (i + 0.5) / numParticles);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            this.particles.push({
                phi: phi,
                theta: theta,
                x: 0,
                y: 0,
                z: 0,
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.3 + 0.7
            });
        }
        console.log(`Created ${this.particles.length} particles for globe`);
        console.log(`Canvas size: ${this.canvas.width}x${this.canvas.height}`);
        console.log(`Globe radius: ${this.radius}`);
    }

    project3DTo2D(particle) {
        // Convert spherical coordinates to Cartesian
        const x = this.radius * Math.sin(particle.phi) * Math.cos(particle.theta + this.rotation);
        const y = this.radius * Math.sin(particle.phi) * Math.sin(particle.theta + this.rotation);
        const z = this.radius * Math.cos(particle.phi);

        // Simple perspective projection
        const scale = 300 / (300 + z);

        return {
            x: this.centerX + x * scale,
            y: this.centerY + y * scale,
            z: z,
            scale: scale,
            visible: z > -this.radius * 0.3 // Only show front-facing particles
        };
    }

    drawParticle(particle) {
        const projected = this.project3DTo2D(particle);

        if (!projected.visible) return;

        const size = particle.size * projected.scale;
        const alpha = particle.alpha * projected.scale;

        // Get theme colors
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
        const particleColor = isDarkTheme ? '96, 165, 250' : '147, 197, 253'; // blue-400 : blue-300 (brighter)

        this.ctx.beginPath();
        this.ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${particleColor}, ${alpha})`;
        this.ctx.fill();

        // Add glow effect
        const gradient = this.ctx.createRadialGradient(
            projected.x, projected.y, 0,
            projected.x, projected.y, size * 2
        );
        gradient.addColorStop(0, `rgba(${particleColor}, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(${particleColor}, 0)`);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }

    connectParticles() {
        const connectionDistance = 80;

        for (let i = 0; i < this.particles.length; i++) {
            const p1 = this.project3DTo2D(this.particles[i]);
            if (!p1.visible) continue;

            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.project3DTo2D(this.particles[j]);
                if (!p2.visible) continue;

                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.2;
                    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
                    const lineColor = isDarkTheme ? '147, 197, 253' : '59, 130, 246';

                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Auto-rotate
        if (this.autoRotate && !this.isDragging) {
            this.rotation += 0.003;
        }

        // Draw connections first (behind particles)
        this.connectParticles();

        // Sort particles by z-index for proper depth rendering
        const sortedParticles = [...this.particles].sort((a, b) => {
            const projA = this.project3DTo2D(a);
            const projB = this.project3DTo2D(b);
            return projA.z - projB.z;
        });

        // Draw particles
        sortedParticles.forEach(particle => this.drawParticle(particle));

        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        let lastX = 0;

        this.canvas.addEventListener('mouseenter', () => {
            this.canvas.style.cursor = 'grab';
        });

        this.canvas.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.autoRotate = false;
            lastX = e.clientX;
            this.canvas.style.cursor = 'grabbing';
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const deltaX = e.clientX - lastX;
                this.rotation += deltaX * 0.01;
                lastX = e.clientX;
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
            setTimeout(() => {
                this.autoRotate = true;
            }, 1000);
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isDragging = false;
            this.canvas.style.cursor = 'default';
        });

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.autoRotate = false;
            lastX = e.touches[0].clientX;
        });

        this.canvas.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                const deltaX = e.touches[0].clientX - lastX;
                this.rotation += deltaX * 0.01;
                lastX = e.touches[0].clientX;
            }
        });

        this.canvas.addEventListener('touchend', () => {
            this.isDragging = false;
            setTimeout(() => {
                this.autoRotate = true;
            }, 1000);
        });

        // Resize handling
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
}

// Initialize globe when DOM is loaded
function initGlobe() {
    console.log('Initializing globe...');
    const canvas = document.getElementById('globe-canvas');
    if (canvas) {
        console.log('Canvas found, creating globe');
        const globe = new Globe('globe-canvas');
    } else {
        console.error('Globe canvas not found');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobe);
} else {
    // DOM already loaded
    initGlobe();
}

// ==========================================
// Skills Animation
// ==========================================

function animateSkills() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const progress = card.querySelector('.skill-progress');
                const progressValue = progress.dataset.progress;

                // Add visible class to trigger animation
                card.classList.add('visible');

                // Set CSS variable for width
                progress.style.setProperty('--progress-width', progressValue + '%');

                // Unobserve after animation
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    skillCards.forEach(card => observer.observe(card));
}

// Initialize skills animation when DOM is ready
document.addEventListener('DOMContentLoaded', animateSkills);

// Phone Mockup Click Animation
function initPhoneMockupAnimations() {
    const phoneMockups = document.querySelectorAll('.phone-mockup');

    phoneMockups.forEach(phone => {
        phone.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the parent phone-stack container
            const phoneStack = this.closest('.phone-stack');
            if (!phoneStack) return;

            // Get all three phones in this stack
            const leftPhone = phoneStack.querySelector('.phone-left');
            const centerPhone = phoneStack.querySelector('.phone-center');
            const rightPhone = phoneStack.querySelector('.phone-right');

            // Remove any existing animation classes
            [leftPhone, centerPhone, rightPhone].forEach(p => {
                if (p) {
                    p.classList.remove('phone-bounce', 'phone-flip', 'phone-zoom');
                }
            });

            // Trigger animations with a slight delay
            setTimeout(() => {
                if (leftPhone) {
                    leftPhone.classList.add('phone-bounce');
                    setTimeout(() => leftPhone.classList.remove('phone-bounce'), 1000);
                }
            }, 0);

            setTimeout(() => {
                if (centerPhone) {
                    centerPhone.classList.add('phone-zoom');
                    setTimeout(() => centerPhone.classList.remove('phone-zoom'), 1000);
                }
            }, 150);

            setTimeout(() => {
                if (rightPhone) {
                    rightPhone.classList.add('phone-flip');
                    setTimeout(() => rightPhone.classList.remove('phone-flip'), 1000);
                }
            }, 300);
        });

        // Add cursor pointer to indicate clickable
        phone.style.cursor = 'pointer';
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initPhoneMockupAnimations);
