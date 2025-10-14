// JavaScript pour la page de projet avec démonstration interactive

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation de la page de projet...');
    
    // Éléments de la démonstration interactive
    const videoPlaceholder = document.getElementById('video-placeholder');
    const demoModal = document.getElementById('demo-modal');
    const closeModal = document.getElementById('close-modal');
    const playBtn = document.getElementById('play-btn');
    const projectVideo = document.getElementById('project-video');
    
    // Fonction pour vérifier si la vidéo existe
    function checkVideoExists() {
        return projectVideo && projectVideo.querySelector('source') && projectVideo.querySelector('source').src;
    }
    
    // Fonction pour afficher la vidéo
    function showVideo() {
        if (projectVideo) {
            videoPlaceholder.style.display = 'none';
            projectVideo.style.display = 'block';
            projectVideo.play().catch(function(e) {
                console.log('Erreur de lecture vidéo:', e);
                // Fallback vers la démonstration
                showDemo();
            });
        }
    }
    
    // Fonction pour ouvrir la modal
    function openDemoModal() {
        if (demoModal) {
            demoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(function() {
                demoModal.style.opacity = '1';
            }, 10);
        }
    }
    
    // Fonction pour fermer la modal
    function closeDemoModal() {
        if (demoModal) {
            demoModal.style.opacity = '0';
            setTimeout(function() {
                demoModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    // Fonction pour afficher la démonstration
    function showDemo() {
        openDemoModal();
    }
    
    // Événements pour ouvrir la démonstration ou la vidéo
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            if (checkVideoExists()) {
                showVideo();
            } else {
                showDemo();
            }
        });
    }
    
    if (playBtn) {
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (checkVideoExists()) {
                showVideo();
            } else {
                showDemo();
            }
        });
    }
    
    // Événements pour fermer la modal
    if (closeModal) {
        closeModal.addEventListener('click', closeDemoModal);
    }
    
    if (demoModal) {
        demoModal.addEventListener('click', function(e) {
            if (e.target === demoModal) {
                closeDemoModal();
            }
        });
    }
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && demoModal && demoModal.style.display === 'flex') {
            closeDemoModal();
        }
    });
    
    // Navigation de la démonstration
    const demoNavBtns = document.querySelectorAll('.demo-nav-btn');
    const demoFeatures = document.querySelectorAll('.demo-feature');
    
    demoNavBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const target = btn.dataset.target;
            
            // Mettre à jour les boutons
            demoNavBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            
            // Mettre à jour les contenus
            demoFeatures.forEach(function(feature) {
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
    function animateStats() {
        const statNumbers = document.querySelectorAll('.result-stat .stat-number');
        
        statNumbers.forEach(function(stat) {
            const target = parseInt(stat.textContent);
            if (target > 0) {
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(function() {
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
    }
    
    // Observer pour les statistiques
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const resultsSection = document.querySelector('.results');
    if (resultsSection) {
        statsObserver.observe(resultsSection);
    }
    
    // Gestion des images avec fallback
    const images = document.querySelectorAll('.screenshot-item img, .feature-img, .video-poster');
    images.forEach(function(img) {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlmYTJhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
            this.alt = 'Image non disponible';
        });
    });
    
    // Animation d'apparition au scroll
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    // Observer les éléments à animer
    const animateElements = document.querySelectorAll('.feature-card, .challenge-item, .screenshot-item, .tech-stack, .project-links, .project-stats');
    animateElements.forEach(function(el, index) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
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
    setTimeout(function() {
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach(function(bar, index) {
            const height = bar.style.height;
            bar.style.setProperty('--target-height', height);
            bar.style.height = '0';
            
            setTimeout(function() {
                bar.style.transition = 'height 1s ease-out';
                bar.style.height = height;
            }, index * 200);
        });
    }, 1000);
    
    console.log('Page de projet avec démonstration interactive initialisée avec succès');
});