// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    
    setTimeout(() => {
        cursorTrail.style.left = e.clientX - 4 + 'px';
        cursorTrail.style.top = e.clientY - 4 + 'px';
    }, 100);
});

// Cursor hover effects
const clickables = document.querySelectorAll('a, button, .tech-item, .cert-card, .project-card');
clickables.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'var(--accent)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--primary-color)';
    });
});

// Smooth scrolling
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('.about, .projects, .contact').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Animate project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Typing effect for hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Particle background effect
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'var(--primary-color)';
    particle.style.opacity = Math.random() * 0.5;
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 3000 + 2000;
    const horizontalMovement = (Math.random() - 0.5) * 100;
    
    particle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${horizontalMovement}px, -${window.innerHeight + 100}px)` }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 300);

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle (for future enhancement)
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.classList.add('mobile-menu-btn');
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuBtn.style.display = 'none';

// Show mobile menu button on small screens
if (window.innerWidth <= 768) {
    mobileMenuBtn.style.display = 'block';
    document.querySelector('.nav-container').appendChild(mobileMenuBtn);
}