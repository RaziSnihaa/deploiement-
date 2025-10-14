// Navigation mobile toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling pour les liens de navigation
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

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe scroll-animate
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));
});

// Ajouter les classes d'animation aux éléments
window.addEventListener('load', () => {
    // Attendre que tout soit chargé avant d'ajouter les animations
    setTimeout(() => {
        // Ajouter la classe scroll-animate aux sections
        const sections = document.querySelectorAll('section > .container, .hero-container');
        sections.forEach(section => {
            section.classList.add('scroll-animate');
        });

        // Ajouter aux cartes de projet
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('scroll-animate');
            card.style.animationDelay = `${index * 0.2}s`;
        });

        // Ajouter aux catégories de compétences
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            category.classList.add('scroll-animate');
            category.style.animationDelay = `${index * 0.3}s`;
        });
    }, 500);
});

// Effet de typing pour le titre principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Navbar transparente au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animation des statistiques
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (stat.textContent.includes('+')) {
                stat.textContent = Math.floor(current) + '+';
            } else if (stat.textContent.includes('%')) {
                stat.textContent = Math.floor(current) + '%';
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// Observer pour les statistiques
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validation simple
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Simuler l'envoi du formulaire
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler un délai d'envoi
        setTimeout(() => {
            showNotification('Message envoyé avec succès !', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Système de notification
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 14px;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Fermeture automatique
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Fermeture manuelle
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Effet parallax pour le hero (désactivé temporairement pour éviter les conflits)
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
*/

// Animation des compétences au hover
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
});

// Curseur personnalisé pour les projets
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        card.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });
});

// Gestion de l'image de profil par défaut et contrôles média
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profile-img');
    const profileVideo = document.getElementById('profile-video');
    const togglePhoto = document.getElementById('toggle-photo');
    const toggleVideo = document.getElementById('toggle-video');
    
    // Gestion de l'image de profil par défaut
    profileImg.addEventListener('error', () => {
        profileImg.style.display = 'none';
        const avatar = profileImg.parentElement;
        const placeholder = document.createElement('div');
        placeholder.innerHTML = '<i class="fas fa-user"></i>';
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: rgba(255, 255, 255, 0.7);
            background: rgba(255, 255, 255, 0.1);
            position: absolute;
            top: 0;
            left: 0;
        `;
        placeholder.classList.add('profile-media', 'active');
        avatar.insertBefore(placeholder, avatar.firstChild);
    });
    
    // Gestion du basculement photo/vidéo
    if (togglePhoto && toggleVideo && profileImg && profileVideo) {
        togglePhoto.addEventListener('click', () => {
            // Activer la photo
            profileImg.classList.add('active');
            profileVideo.classList.remove('active');
            
            // Mettre à jour les boutons
            togglePhoto.classList.add('active');
            toggleVideo.classList.remove('active');
            
            // Pauser la vidéo
            profileVideo.pause();
        });
        
        toggleVideo.addEventListener('click', () => {
            // Activer la vidéo
            profileVideo.classList.add('active');
            profileImg.classList.remove('active');
            
            // Mettre à jour les boutons
            toggleVideo.classList.add('active');
            togglePhoto.classList.remove('active');
            
            // Jouer la vidéo
            profileVideo.play().catch(e => {
                console.log('Autoplay bloqué par le navigateur:', e);
            });
        });
        
        // Gestion des erreurs vidéo
        profileVideo.addEventListener('error', () => {
            console.log('Erreur de chargement de la vidéo');
            toggleVideo.style.display = 'none';
            togglePhoto.click(); // Basculer vers la photo
        });
        
        // Auto-play de la vidéo si possible
        profileVideo.addEventListener('loadeddata', () => {
            if (profileVideo.classList.contains('active')) {
                profileVideo.play().catch(e => {
                    console.log('Autoplay bloqué par le navigateur:', e);
                });
            }
        });
    }
});

// Animation d'entrée pour la page
window.addEventListener('load', () => {
    // Retirer l'animation d'entrée qui peut causer le problème
    document.body.style.opacity = '1';
    document.body.style.transition = 'none';
});

// Préchargement des images
function preloadImages() {
    const images = [
        'images/project1.jpg',
        'images/project2.jpg',
        'images/project3.jpg',
        'images/profile.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialisation simplifiée
document.addEventListener('DOMContentLoaded', () => {
    // Préchargement des images en arrière-plan
    setTimeout(() => {
        preloadImages();
    }, 1000);
    
    // Animation du contenu hero après chargement
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 200);
});

// Gestion du redimensionnement de la fenêtre
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculer les animations si nécessaire
        const animatedElements = document.querySelectorAll('.animate');
        animatedElements.forEach(el => {
            el.style.transform = 'none';
            setTimeout(() => {
                el.style.transform = '';
            }, 50);
        });
    }, 250);
});

// Easter egg : Animation spéciale sur le logo
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.nav-logo a');
    let clickCount = 0;
    
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        clickCount++;
        
        if (clickCount === 5) {
            logo.style.animation = 'spin 1s ease-in-out';
            showNotification('🎉 Vous avez trouvé l\'easter egg !', 'success');
            clickCount = 0;
            
            setTimeout(() => {
                logo.style.animation = '';
            }, 1000);
        }
    });
});

// Style pour l'animation spin
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);