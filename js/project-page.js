// JavaScript pour la page de projet avec démonstration interactive

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initialisation de la page de projet...');
    
    // Gestion de la démonstration interactive
    const videoPlaceholder = document.getElementById('video-placeholder');
    const demoModal = document.getElementById('demo-modal');
    const closeModal = document.getElementById('close-modal');
    const playBtn = document.getElementById('play-btn');
    
    // Ouvrir la démonstration interactive
    if (videoPlaceholder && demoModal) {
        videoPlaceholder.addEventListener('click', () => {
            demoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                demoModal.style.opacity = '1';
            }, 10);
        });
        
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                demoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        }
    }
    
    // Fermer la modal
    function closeDemoModal() {
        if (demoModal) {
            demoModal.style.opacity = '0';
            setTimeout(() => {
                demoModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeDemoModal);
    }
    
    if (demoModal) {
        // Fermer en cliquant à l'extérieur
        demoModal.addEventListener('click', (e) => {
            if (e.target === demoModal) {
                closeDemoModal();
            }
        });
    }
    
    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && demoModal && demoModal.style.display === 'flex') {
            closeDemoModal();
        }
    });
    
    // Navigation de la démonstration
    const demoNavBtns = document.querySelectorAll('.demo-nav-btn');
    const demoFeatures = document.querySelectorAll('.demo-feature');
    
    demoNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            
            // Mettre à jour les boutons
            demoNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Mettre à jour les contenus
            demoFeatures.forEach(feature => {
                feature.classList.remove('active');
                if (feature.dataset.feature === target) {
                    feature.classList.add('active');
                }
            });
        });
    });
    
    // Activer le premier élément par défaut
    if (demoNavBtns.length > 0) {
        demoNavBtns[0].classList.add('active');
    }
    
    // Animation des statistiques
    const observeStats = () => {
        const statNumbers = document.querySelectorAll('.result-stat .stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            if (target > 0) {
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (stat.textContent.includes('%')) {
                        stat.textContent = Math.floor(current) + '%';
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 30);
            }
        });
    };
    
    // Observer pour les statistiques
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observeStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const resultsSection = document.querySelector('.results');
    if (resultsSection) {
        statsObserver.observe(resultsSection);
    }
    
    // Gestion des images avec fallback
    const screenshots = document.querySelectorAll('.screenshot-item img, .feature-img');
    screenshots.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlmYTJhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
            this.alt = 'Image non disponible';
        });
    });
    
    // Animation d'apparition au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    // Observer les éléments à animer
    const animateElements = document.querySelectorAll('.feature-card, .challenge-item, .screenshot-item, .tech-stack, .project-links, .project-stats');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Ajout des styles CSS
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .demo-modal {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        @keyframes chartGrow {
            from { height: 0 !important; }
            to { height: var(--target-height); }
        }
    `;
    document.head.appendChild(style);
    
    // Animation des barres de graphique
    setTimeout(() => {
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            const height = bar.style.height;
            bar.style.setProperty('--target-height', height);
            bar.style.height = '0';
            
            setTimeout(() => {
                bar.style.transition = 'height 1s ease-out';
                bar.style.height = height;
            }, index * 200);
        });
    }, 1000);
    
    console.log('Page de projet avec démonstration interactive initialisée avec succès');
});
    
    // Animation des statistiques de résultats
    const observeStats = () => {
        const statNumbers = document.querySelectorAll('.result-stat .stat-number');
        
        const animateNumber = (element, target) => {
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (element.textContent.includes('%')) {
                    element.textContent = Math.floor(current) + '%';
                } else {
                    element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
                }
            }, 30);
        };
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            if (target > 0) {
                animateNumber(stat, target);
            }
        });
    };
    
    // Observer pour les statistiques
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observeStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const resultsSection = document.querySelector('.results');
    if (resultsSection) {
        statsObserver.observe(resultsSection);
    }
    
    // Animation des cartes de fonctionnalités
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    // Gestion du scroll fluide pour les liens internes
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
    
    // Gestion des images de captures d'écran avec lazy loading
    const screenshots = document.querySelectorAll('.screenshot-item img');
    screenshots.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlmYTJhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
            this.alt = 'Image non disponible';
        });
    });
    
    // Effet de parallaxe léger pour l'en-tête
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.project-header');
        if (header && scrolled < header.offsetHeight) {
            header.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Animation d'apparition au scroll
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
    
    // Observer les éléments à animer
    const animateElements = document.querySelectorAll('.feature-card, .challenge-item, .screenshot-item, .tech-stack, .project-links, .project-stats');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(el);
    });
    
    // Classe CSS pour l'animation
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .video-error {
            text-align: center;
            padding: 20px;
        }
    `;
    document.head.appendChild(style);
    
    // Préchargement des images importantes
    const preloadImages = () => {
        const imagesToPreload = [
            'images/projet1-screen1.jpg',
            'images/projet1-screen2.jpg',
            'images/projet1-screen3.jpg',
            'images/projet1-screen4.jpg'
        ];
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    
    // Démarrer le préchargement après un court délai
    setTimeout(preloadImages, 1000);
    
    // Gestion du redimensionnement de fenêtre
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculer les positions si nécessaire
            const animatedElements = document.querySelectorAll('.animate');
            animatedElements.forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight) {
                    el.classList.add('animate');
                }
            });
        }, 250);
    });
    
    console.log('Page de projet initialisée avec succès');
});