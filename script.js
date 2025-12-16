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

// Work Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

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
document.querySelectorAll('.section, .project-card, .highlight-card, .timeline-item').forEach(el => {
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
