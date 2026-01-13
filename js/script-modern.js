// ===================================
// 🚀 PORTFOLIO ULTRA-MODERNE - JAVASCRIPT AVANCÉ
// Effets de particules, animations, et interactions
// ===================================

// ==================== CONFIGURATION ====================
const CONFIG = {
    particles: {
        count: 100,
        speed: 0.5,
        size: 2,
        connections: true
    },
    matrix: {
        fontSize: 14,
        speed: 30,
        density: 0.03
    }
};

// ==================== SYSTÈME DE PARTICULES ====================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < CONFIG.particles.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * CONFIG.particles.speed,
                vy: (Math.random() - 0.5) * CONFIG.particles.speed,
                size: Math.random() * CONFIG.particles.size + 1
            });
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner les particules
        this.particles.forEach((particle, i) => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fill();
            
            // Mise à jour de la position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebonds sur les bords
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Connexions entre particules
            if (CONFIG.particles.connections) {
                this.particles.slice(i + 1).forEach(p2 => {
                    const dx = particle.x - p2.x;
                    const dy = particle.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.stroke();
                    }
                });
            }
            
            // Interaction avec la souris
            if (this.mouse.x !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const angle = Math.atan2(dy, dx);
                    const force = (150 - distance) / 150;
                    particle.vx += Math.cos(angle) * force * 0.5;
                    particle.vy += Math.sin(angle) * force * 0.5;
                }
            }
        });
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ==================== EFFET MATRIX ====================
class MatrixEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.columns = 0;
        this.drops = [];
        
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => {
            this.resize();
            this.init();
        });
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.columns = Math.floor(this.canvas.width / CONFIG.matrix.fontSize);
    }
    
    init() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
        this.animate();
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(102, 126, 234, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00f3ff';
        this.ctx.font = CONFIG.matrix.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * CONFIG.matrix.fontSize;
            const y = this.drops[i] * CONFIG.matrix.fontSize;
            
            this.ctx.fillText(char, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        setTimeout(() => this.animate(), CONFIG.matrix.speed);
    }
}

// ==================== TYPING EFFECT ====================
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ==================== COMPTEURS ANIMÉS ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                // Ajouter le suffixe approprié
                const suffix = counter.textContent.includes('+') ? '+' : 
                              counter.textContent.includes('%') ? '%' : '';
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                const suffix = target === 20 || target === 3 ? '+' : '%';
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
}

// ==================== ANIMATIONS AU SCROLL (AOS) ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1) rotate(0)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// ==================== PARALLAXE AU SCROLL ====================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallaxe pour le hero
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Parallaxe pour l'avatar
        const avatar = document.querySelector('.hero-avatar');
        if (avatar) {
            avatar.style.transform = `translateY(${scrolled * -0.3}px)`;
        }
    });
}

// ==================== NAVBAR AU SCROLL ====================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ==================== MENU MOBILE ====================
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
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
}

// ==================== GESTION DU FORMULAIRE ====================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            submitBtn.disabled = true;
            
            // Simuler l'envoi
            setTimeout(() => {
                showNotification('Message envoyé avec succès !', 'success');
                form.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// ==================== SYSTÈME DE NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px 30px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        border-left: 4px solid ${type === 'success' ? '#10b981' : '#ef4444'};
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}" 
               style="font-size: 1.5rem; color: ${type === 'success' ? '#10b981' : '#ef4444'};"></i>
            <span style="font-weight: 500;">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ==================== MÉDIA CONTROLS (Photo/Video) ====================
function initMediaControls() {
    const togglePhoto = document.getElementById('toggle-photo');
    const toggleVideo = document.getElementById('toggle-video');
    const profileImg = document.getElementById('profile-img');
    const profileVideo = document.getElementById('profile-video');
    
    if (togglePhoto && toggleVideo) {
        togglePhoto.addEventListener('click', () => {
            profileImg.classList.add('active');
            profileVideo.classList.remove('active');
            togglePhoto.classList.add('active');
            toggleVideo.classList.remove('active');
        });
        
        toggleVideo.addEventListener('click', () => {
            profileVideo.classList.add('active');
            profileImg.classList.remove('active');
            toggleVideo.classList.add('active');
            togglePhoto.classList.remove('active');
        });
    }
}

// ==================== THEME TOGGLE (DARK/LIGHT MODE) ====================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    // Charger le thème sauvegardé ou utiliser dark par défaut
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
    
    console.log('Theme toggle initialized with theme:', savedTheme);
    
    // Event listener pour le bouton
    themeToggle.addEventListener('click', () => {
        console.log('Theme toggle clicked!');
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Switching from', currentTheme, 'to', newTheme);
        
        // Animation de rotation
        themeToggle.classList.add('rotating');
        setTimeout(() => themeToggle.classList.remove('rotating'), 500);
        
        // Changer le thème
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
    
    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
        console.log('Icon updated for theme:', theme);
    }
}

// ==================== CURSEUR PERSONNALISÉ ====================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = (e.clientX - 2.5) + 'px';
        cursorDot.style.top = (e.clientY - 2.5) + 'px';
    });
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ==================== ANIMATIONS CSS @keyframes ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== INITIALISATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio Ultra-Moderne chargé !');
    
    // Initialiser les systèmes de particules
    const particlesCanvas = document.getElementById('particles-canvas');
    const matrixCanvas = document.getElementById('matrix-canvas');
    
    if (particlesCanvas) new ParticleSystem(particlesCanvas);
    if (matrixCanvas) new MatrixEffect(matrixCanvas);
    
    // Initialiser le typing effect
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        // Retirer les classes d'animation CSS qui cachent le texte
        typingElement.style.overflow = 'visible';
        typingElement.style.borderRight = 'none';
        typingElement.style.animation = 'none';
        
        // Lancer l'effet typing
        new TypingEffect(typingElement, [
            'Razi Sniha',
            'Data Scientist',
            'AI Engineer',
            'ML Expert'
        ], 150);
    }
    
    // Initialiser les autres fonctionnalités
    initScrollAnimations();
    initParallax();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initMediaControls();
    // Theme toggle initialisé dans theme-toggle.js
    
    // Curseur personnalisé (optionnel - peut être désactivé)
    // initCustomCursor();
    
    // Observer pour les stats
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    console.log('✨ Toutes les animations sont prêtes !');
});

// ==================== PERFORMANCE ====================
// Désactiver les animations pendant le scroll rapide
let scrollTimeout;
window.addEventListener('scroll', () => {
    document.body.classList.add('disable-hover');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.body.classList.remove('disable-hover');
    }, 100);
}, { passive: true });
