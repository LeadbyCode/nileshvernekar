// Modern Portfolio JavaScript

// Globe Visualization
class Globe {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dots = [];
        this.numDots = 800;
        this.rotationSpeed = 0.001;
        this.rotation = 0;
        this.radius = 140;

        // Set canvas size
        this.resize();
        this.init();
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const container = this.canvas.parentElement;
        const size = Math.min(container.clientWidth, 400);
        this.canvas.width = size;
        this.canvas.height = size;
        this.centerX = size / 2;
        this.centerY = size / 2;
    }

    init() {
        this.dots = [];
        for (let i = 0; i < this.numDots; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            this.dots.push({
                theta: theta,
                phi: phi,
                x: 0,
                y: 0,
                z: 0,
                alpha: Math.random() * 0.5 + 0.3
            });
        }
    }

    project(dot) {
        const x = this.radius * Math.sin(dot.phi) * Math.cos(dot.theta + this.rotation);
        const y = this.radius * Math.sin(dot.phi) * Math.sin(dot.theta + this.rotation);
        const z = this.radius * Math.cos(dot.phi);

        const scale = 200 / (200 + z);
        const x2d = this.centerX + x * scale;
        const y2d = this.centerY + y * scale;

        return { x: x2d, y: y2d, z: z, scale: scale };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Sort dots by z-index
        const projectedDots = this.dots.map(dot => ({
            ...dot,
            ...this.project(dot)
        })).sort((a, b) => a.z - b.z);

        // Draw connections
        this.ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < projectedDots.length; i++) {
            const dot1 = projectedDots[i];

            for (let j = i + 1; j < Math.min(i + 5, projectedDots.length); j++) {
                const dot2 = projectedDots[j];
                const distance = Math.hypot(dot1.x - dot2.x, dot1.y - dot2.y);

                if (distance < 50) {
                    const alpha = (1 - distance / 50) * 0.3;
                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(dot1.x, dot1.y);
                    this.ctx.lineTo(dot2.x, dot2.y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw dots
        projectedDots.forEach(dot => {
            const size = dot.scale * 2;
            const alpha = dot.alpha * (dot.z > 0 ? 1 : 0.3);

            this.ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
            this.ctx.fill();

            // Add glow for visible dots
            if (dot.z > 0 && alpha > 0.5) {
                this.ctx.fillStyle = `rgba(139, 92, 246, ${alpha * 0.3})`;
                this.ctx.beginPath();
                this.ctx.arc(dot.x, dot.y, size * 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
    }

    animate() {
        this.rotation += this.rotationSpeed;
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize globe when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Globe
    const globeCanvas = document.getElementById('globeCanvas');
    if (globeCanvas) {
        new Globe(globeCanvas);
    }

    // Email copy functionality
    const emailBtn = document.getElementById('emailBtn');
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const email = 'nilesh.vernekar11@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const originalText = emailBtn.querySelector('span').textContent;
                emailBtn.querySelector('span').textContent = 'Copied!';
                emailBtn.style.background = 'rgba(139, 92, 246, 0.2)';
                emailBtn.style.borderColor = 'rgba(139, 92, 246, 0.5)';

                setTimeout(() => {
                    emailBtn.querySelector('span').textContent = originalText;
                    emailBtn.style.background = '';
                    emailBtn.style.borderColor = '';
                }, 2000);
            });
        });
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for card animations
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

    // Observe all cards
    document.querySelectorAll('.card, .featured-app').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add parallax effect to background gradient
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const bgGradient = document.querySelector('.bg-gradient');
                if (bgGradient) {
                    bgGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add active state to navigation on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add hover effect to tech badges
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add cursor trail effect (subtle)
    let cursorTrail = [];
    const maxTrailLength = 20;

    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    });

    // Animate cards on hover
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Log initialization
    console.log('Portfolio initialized successfully');
});

// Add smooth reveal animation for page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
