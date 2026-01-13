// ===================================
// TRANSLATION SYSTEM
// ===================================

const translations = {
    fr: {
        // Navigation
        nav: {
            home: "Accueil",
            about: "À propos",
            skills: "Compétences",
            certifications: "Certifications",
            projects: "Projets",
            contact: "Contact"
        },
        
        // Hero Section
        hero: {
            status: "Disponible pour des opportunités",
            greeting: "Bonjour, je suis",
            subtitle: "Développeur passionné et créateur d'expériences numériques",
            tags: {
                dataScientist: "Data Scientist",
                aiEngineer: "AI Engineer",
                mlExpert: "ML Expert"
            },
            stats: {
                experience: "Années d'expérience",
                projects: "Projets complétés",
                satisfaction: "Satisfaction client"
            },
            buttons: {
                viewProjects: "Voir mes projets",
                contact: "Me contacter"
            },
            scrollDown: "Scroll down"
        },
        
        // About Section
        about: {
            title: "À propos de moi",
            subtitle: "Découvrez mon parcours et ma passion",
            whoAmI: "Qui suis-je ?",
            description1: "Je suis Razi Sniha, ingénieur informatique diplômé de l'école ESPRIT, spécialisé en Data Science et passionné par l'intelligence artificielle appliquée. Mon parcours m'a permis de développer des compétences solides en modélisation prédictive, machine learning, deep learning, computer vision et développement de solutions intelligentes.",
            description2: "Je suis motivé, autonome et curieux, capable de transformer des idées en solutions complètes : collecte et préparation des données, modélisation, optimisation et déploiement. Mon objectif est de rejoindre une équipe innovante où je peux continuer à apprendre tout en contribuant à des projets d'envergure.",
            stats: {
                projects: "Projets complétés",
                satisfaction: "Satisfaction",
                hackathons: "Hackathons participés"
            },
            timeline: {
                title: "Formation & Expérience",
                education: {
                    title: "Diplôme d'Ingénieur en Informatique",
                    institution: "ESPRIT - École Supérieure Privée d'Ingénierie et de Technologies",
                    date: "2020 - 2024",
                    description: "Spécialisation en Data Science et Intelligence Artificielle. Formation complète en ML, Deep Learning, Computer Vision et développement logiciel.",
                    tags: ["Data Science", "IA", "Python", "Machine Learning"]
                },
                pfe: {
                    title: "Projet de Fin d'Études - NeuroWatts",
                    institution: "Projet Innovant",
                    date: "2024",
                    description: "Développement d'une plateforme intelligente de monitoring énergétique utilisant XGBoost pour la prédiction, RAG + LLM pour l'analyse, et MobileNetV2 pour le traitement d'images.",
                    tags: ["XGBoost", "LLM", "Deep Learning", "IoT"]
                },
                hackathons: {
                    title: "Participation aux Hackathons",
                    institution: "Compétitions & Défis Techniques",
                    date: "2022 - 2024",
                    description: "Participation active à plus de 20 hackathons, développement de solutions innovantes sous pression, travail en équipe et résolution de problèmes complexes.",
                    tags: ["Innovation", "Travail d'équipe", "Créativité"]
                },
                certifications: {
                    title: "Compétences & Certifications",
                    institution: "Formation Continue",
                    description: "Expert en Python, TensorFlow, PyTorch, Scikit-learn. Kaggle competitor et contributeur open-source. Membre actif de l'IEEE.",
                    tags: ["Kaggle", "IEEE Member", "Open Source"]
                }
            }
        },
        
        // Skills Section
        skills: {
            title: "Mes compétences",
            subtitle: "Compétences techniques et domaines d'expertise",
            categories: {
                ai: {
                    title: "🧠 Intelligence Artificielle & Machine Learning",
                    items: [
                        "Modélisation prédictive (régression, classification)",
                        "LSTM / RNN / GRU (séries temporelles)",
                        "XGBoost, LightGBM, Random Forest",
                        "CNN & fine-tuning (MobileNet, ResNet...)",
                        "Détection d'anomalies (AutoEncoders, MVTec AD)",
                        "RAG & développement de chatbots (LLM, GPT, LLaMA)"
                    ]
                },
                dataScience: {
                    title: "📊 Data Science & Data Engineering",
                    items: [
                        "Nettoyage, transformation, feature engineering",
                        "Manipulation de grands datasets & pipelines (Pandas, NumPy, Scikit-learn)",
                        "Gestion données temporelles (lags, rolling windows)",
                        "Visualisation (Matplotlib, Plotly)"
                    ]
                },
                energy: {
                    title: "⚡ Spécialisation Énergie & Smart Systems",
                    items: [
                        "Prédiction consommation énergétique (court/moyen/long terme)",
                        "Modèles pour microgrids intelligents",
                        "Analyse signaux énergétiques (active/reactive power)",
                        "Datasets spécialisés (SFMConnect, Household Power Consumption)"
                    ]
                },
                development: {
                    title: "🧩 Développement logiciel & Backend",
                    items: [
                        "Python (expert) — FastAPI / Flask / Django",
                        "Git / GitHub & CI/CD",
                        "Intégration ML dans apps web/mobile",
                        "Notebooks reproductibles (Kaggle, research)"
                    ]
                },
                cv: {
                    title: "🤖 Computer Vision",
                    items: [
                        "OpenCV — traitement d'images & vidéo",
                        "Détection d'objets & segmentation",
                        "Analyse vidéo (frames, pose estimation)",
                        "Préparation & augmentation de datasets"
                    ]
                },
                database: {
                    title: "🗄️ Bases de données",
                    items: [
                        "SQL (MySQL, PostgreSQL)",
                        "NoSQL (MongoDB)",
                        "Optimisation de requêtes & conception de schémas"
                    ]
                },
                cloud: {
                    title: "☁️ Cloud & DevOps",
                    items: [
                        "Google Cloud, Azure",
                        "Kaggle — notebooks & competitions",
                        "Docker, gestion GPU (CUDA)"
                    ]
                },
                mobile: {
                    title: "📱 Mobile & 3D (basique)",
                    items: [
                        "Flutter (intégration modèles, .glb)",
                        "Notions de rigging et animation (Blender)"
                    ]
                },
                soft: {
                    title: "🧩 Compétences transversales & Points forts",
                    items: [
                        "Résolution de problèmes complexes",
                        "Gestion de projet et documentation",
                        "Présentation technique & communication",
                        "Profil orienté IA appliquée — expertise prédiction énergétique"
                    ]
                }
            }
        },
        
        // Certifications Section
        certifications: {
            title: "Certifications & Accomplissements",
            subtitle: "Mes formations et certifications professionnelles",
            viewCert: "Voir le certificat",
            stats: {
                total: "Certifications",
                institutions: "Institutions",
                continuous: "Formation Continue"
            }
        },
        
        // Projects Section
        projects: {
            title: "Mes projets",
            subtitle: "Découvrez mes réalisations récentes",
            viewDetails: "Voir les détails",
            project1: {
                title: "NeuroWatts — Projet de Fin d'Études",
                description: "NeuroWatts : plateforme intelligente de monitoring énergétique — prédiction (XGBoost), détection d'anomalies (RAG + LLM + AutoEncoder) et analyse d'images (MobileNetV2)."
            },
            project2: {
                title: "Graph Knowledge System",
                description: "Système combinant LLMs (GPT-4 Mini), GNNs (GraphSAGE, GAT) et RAG (Pinecone) pour la gestion et la recommandation sur les risques de projet."
            },
            project3: {
                title: "Projet Sahali",
                description: "Sahali — plateforme pour enfants dyslexiques (Face Login, jeux éducatifs, TTS/ASR, Power BI)."
            }
        },
        
        // Contact Section
        contact: {
            title: "Entrons en contact",
            subtitle: "N'hésitez pas à me contacter pour toute opportunité ou collaboration",
            location: "Localisation",
            email: "Email",
            phone: "Téléphone",
            social: "Suivez-moi sur les réseaux sociaux",
            locationValue: "Ariana, Tunisie"
        },
        
        // Footer
        footer: {
            rights: "Tous droits réservés."
        }
    },
    
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            skills: "Skills",
            certifications: "Certifications",
            projects: "Projects",
            contact: "Contact"
        },
        
        // Hero Section
        hero: {
            status: "Available for opportunities",
            greeting: "Hello, I'm",
            subtitle: "Passionate developer and creator of digital experiences",
            tags: {
                dataScientist: "Data Scientist",
                aiEngineer: "AI Engineer",
                mlExpert: "ML Expert"
            },
            stats: {
                experience: "Years of experience",
                projects: "Completed projects",
                satisfaction: "Client satisfaction"
            },
            buttons: {
                viewProjects: "View my projects",
                contact: "Contact me"
            },
            scrollDown: "Scroll down"
        },
        
        // About Section
        about: {
            title: "About me",
            subtitle: "Discover my journey and passion",
            whoAmI: "Who am I?",
            description1: "I am Razi Sniha, a computer engineering graduate from ESPRIT, specialized in Data Science and passionate about applied artificial intelligence. My journey has allowed me to develop strong skills in predictive modeling, machine learning, deep learning, computer vision, and intelligent solution development.",
            description2: "I am motivated, autonomous, and curious, capable of transforming ideas into complete solutions: data collection and preparation, modeling, optimization, and deployment. My goal is to join an innovative team where I can continue learning while contributing to large-scale projects.",
            stats: {
                projects: "Completed projects",
                satisfaction: "Satisfaction",
                hackathons: "Hackathons attended"
            },
            timeline: {
                title: "Education & Experience",
                education: {
                    title: "Computer Engineering Degree",
                    institution: "ESPRIT - Private Higher School of Engineering and Technologies",
                    date: "2020 - 2024",
                    description: "Specialization in Data Science and Artificial Intelligence. Comprehensive training in ML, Deep Learning, Computer Vision, and software development.",
                    tags: ["Data Science", "AI", "Python", "Machine Learning"]
                },
                pfe: {
                    title: "Final Year Project - NeuroWatts",
                    institution: "Innovative Project",
                    date: "2024",
                    description: "Development of an intelligent energy monitoring platform using XGBoost for prediction, RAG + LLM for analysis, and MobileNetV2 for image processing.",
                    tags: ["XGBoost", "LLM", "Deep Learning", "IoT"]
                },
                hackathons: {
                    title: "Hackathon Participation",
                    institution: "Competitions & Technical Challenges",
                    date: "2022 - 2024",
                    description: "Active participation in over 20 hackathons, developing innovative solutions under pressure, teamwork, and complex problem-solving.",
                    tags: ["Innovation", "Teamwork", "Creativity"]
                },
                certifications: {
                    title: "Skills & Certifications",
                    institution: "Continuous Learning",
                    description: "Expert in Python, TensorFlow, PyTorch, Scikit-learn. Kaggle competitor and open-source contributor. Active IEEE member.",
                    tags: ["Kaggle", "IEEE Member", "Open Source"]
                }
            }
        },
        
        // Skills Section
        skills: {
            title: "My skills",
            subtitle: "Technical skills and areas of expertise",
            categories: {
                ai: {
                    title: "🧠 Artificial Intelligence & Machine Learning",
                    items: [
                        "Predictive modeling (regression, classification)",
                        "LSTM / RNN / GRU (time series)",
                        "XGBoost, LightGBM, Random Forest",
                        "CNN & fine-tuning (MobileNet, ResNet...)",
                        "Anomaly detection (AutoEncoders, MVTec AD)",
                        "RAG & chatbot development (LLM, GPT, LLaMA)"
                    ]
                },
                dataScience: {
                    title: "📊 Data Science & Data Engineering",
                    items: [
                        "Cleaning, transformation, feature engineering",
                        "Large dataset manipulation & pipelines (Pandas, NumPy, Scikit-learn)",
                        "Time series data management (lags, rolling windows)",
                        "Visualization (Matplotlib, Plotly)"
                    ]
                },
                energy: {
                    title: "⚡ Energy Specialization & Smart Systems",
                    items: [
                        "Energy consumption prediction (short/medium/long term)",
                        "Models for smart microgrids",
                        "Energy signal analysis (active/reactive power)",
                        "Specialized datasets (SFMConnect, Household Power Consumption)"
                    ]
                },
                development: {
                    title: "🧩 Software Development & Backend",
                    items: [
                        "Python (expert) — FastAPI / Flask / Django",
                        "Git / GitHub & CI/CD",
                        "ML integration in web/mobile apps",
                        "Reproducible notebooks (Kaggle, research)"
                    ]
                },
                cv: {
                    title: "🤖 Computer Vision",
                    items: [
                        "OpenCV — image & video processing",
                        "Object detection & segmentation",
                        "Video analysis (frames, pose estimation)",
                        "Dataset preparation & augmentation"
                    ]
                },
                database: {
                    title: "🗄️ Databases",
                    items: [
                        "SQL (MySQL, PostgreSQL)",
                        "NoSQL (MongoDB)",
                        "Query optimization & schema design"
                    ]
                },
                cloud: {
                    title: "☁️ Cloud & DevOps",
                    items: [
                        "Google Cloud, Azure",
                        "Kaggle — notebooks & competitions",
                        "Docker, GPU management (CUDA)"
                    ]
                },
                mobile: {
                    title: "📱 Mobile & 3D (basic)",
                    items: [
                        "Flutter (model integration, .glb)",
                        "Rigging and animation basics (Blender)"
                    ]
                },
                soft: {
                    title: "🧩 Soft Skills & Key Strengths",
                    items: [
                        "Complex problem solving",
                        "Project management and documentation",
                        "Technical presentation & communication",
                        "Applied AI focus — energy prediction expertise"
                    ]
                }
            }
        },
        
        // Certifications Section
        certifications: {
            title: "Certifications & Achievements",
            subtitle: "My training and professional certifications",
            viewCert: "View certificate",
            stats: {
                total: "Certifications",
                institutions: "Institutions",
                continuous: "Continuous Learning"
            }
        },
        
        // Projects Section
        projects: {
            title: "My projects",
            subtitle: "Discover my recent achievements",
            viewDetails: "View details",
            project1: {
                title: "NeuroWatts — Final Year Project",
                description: "NeuroWatts: intelligent energy monitoring platform — prediction (XGBoost), anomaly detection (RAG + LLM + AutoEncoder), and image analysis (MobileNetV2)."
            },
            project2: {
                title: "Graph Knowledge System",
                description: "System combining LLMs (GPT-4 Mini), GNNs (GraphSAGE, GAT), and RAG (Pinecone) for project risk management and recommendations."
            },
            project3: {
                title: "Sahali Project",
                description: "Sahali — platform for dyslexic children (Face Login, educational games, TTS/ASR, Power BI)."
            }
        },
        
        // Contact Section
        contact: {
            title: "Let's get in touch",
            subtitle: "Feel free to contact me for any opportunity or collaboration",
            location: "Location",
            email: "Email",
            phone: "Phone",
            social: "Follow me on social media",
            locationValue: "Ariana, Tunisia"
        },
        
        // Footer
        footer: {
            rights: "All rights reserved."
        }
    }
};

// ===================================
// LANGUAGE MANAGEMENT
// ===================================

(function() {
    'use strict';
    
    let currentLang = localStorage.getItem('portfolio-lang') || 'fr';
    
    // Initialiser dès que le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguage);
    } else {
        initLanguage();
    }
    
    function initLanguage() {
        console.log('🌍 Initialisation du système de traduction...');
        
        // Créer le sélecteur de langue dans la navbar
        createLanguageSelector();
        
        // Appliquer la langue sauvegardée
        applyLanguage(currentLang);
        
        console.log('✅ Système de traduction initialisé avec la langue:', currentLang);
    }
    
    function createLanguageSelector() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;
        
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        languageSelector.innerHTML = `
            <button class="language-toggle" id="language-toggle">
                <span class="language-flag">${currentLang === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
                <span class="language-text">${currentLang.toUpperCase()}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="language-dropdown" id="language-dropdown">
                <div class="language-option ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr">
                    <span class="language-flag">🇫🇷</span>
                    <span class="language-name">Français</span>
                    <i class="fas fa-check check-icon"></i>
                </div>
                <div class="language-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
                    <span class="language-flag">🇬🇧</span>
                    <span class="language-name">English</span>
                    <i class="fas fa-check check-icon"></i>
                </div>
            </div>
        `;
        
        // Insérer avant le bouton de thème
        const themeToggle = navActions.querySelector('.theme-toggle');
        navActions.insertBefore(languageSelector, themeToggle);
        
        // Event listeners
        const toggle = document.getElementById('language-toggle');
        const dropdown = document.getElementById('language-dropdown');
        const options = dropdown.querySelectorAll('.language-option');
        
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;
                changeLanguage(lang);
                dropdown.classList.remove('active');
            });
        });
        
        // Fermer le dropdown en cliquant ailleurs
        document.addEventListener('click', (e) => {
            if (!languageSelector.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
    
    function changeLanguage(lang) {
        if (lang === currentLang) return;
        
        console.log('🔄 Changement de langue:', currentLang, '→', lang);
        
        currentLang = lang;
        localStorage.setItem('portfolio-lang', lang);
        
        // Animation
        document.body.classList.add('translating');
        setTimeout(() => {
            document.body.classList.remove('translating');
        }, 300);
        
        // Appliquer la nouvelle langue
        applyLanguage(lang);
        
        // Mettre à jour le bouton
        const toggle = document.getElementById('language-toggle');
        if (toggle) {
            toggle.querySelector('.language-flag').textContent = lang === 'fr' ? '🇫🇷' : '🇬🇧';
            toggle.querySelector('.language-text').textContent = lang.toUpperCase();
        }
        
        // Mettre à jour les options
        const options = document.querySelectorAll('.language-option');
        options.forEach(opt => {
            if (opt.dataset.lang === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }
    
    function applyLanguage(lang) {
        const t = translations[lang];
        
        // Navigation
        document.querySelectorAll('.nav-link').forEach((link, index) => {
            const keys = ['home', 'about', 'skills', 'certifications', 'projects', 'contact'];
            if (keys[index]) {
                link.textContent = t.nav[keys[index]];
            }
        });
        
        // Hero Section
        const statusText = document.querySelector('.status-text');
        if (statusText) statusText.textContent = t.hero.status;
        
        const greetingText = document.querySelector('.greeting-text');
        if (greetingText) greetingText.textContent = t.hero.greeting;
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.textContent = t.hero.subtitle;
            heroSubtitle.setAttribute('data-text', t.hero.subtitle);
        }
        
        const heroTags = document.querySelectorAll('.hero-tag');
        if (heroTags.length >= 3) {
            heroTags[0].innerHTML = `<i class="fas fa-brain"></i> ${t.hero.tags.dataScientist}`;
            heroTags[1].innerHTML = `<i class="fas fa-robot"></i> ${t.hero.tags.aiEngineer}`;
            heroTags[2].innerHTML = `<i class="fas fa-chart-line"></i> ${t.hero.tags.mlExpert}`;
        }
        
        const heroStats = document.querySelectorAll('.hero-stat-item .stat-label');
        if (heroStats.length >= 3) {
            heroStats[0].textContent = t.hero.stats.experience;
            heroStats[1].textContent = t.hero.stats.projects;
            heroStats[2].textContent = t.hero.stats.satisfaction;
        }
        
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        if (heroButtons.length >= 2) {
            heroButtons[0].innerHTML = `<span>${t.hero.buttons.viewProjects}</span><i class="fas fa-rocket"></i>`;
            heroButtons[1].innerHTML = `<span>${t.hero.buttons.contact}</span><i class="fas fa-paper-plane"></i>`;
        }
        
        const scrollIndicator = document.querySelector('.scroll-indicator p');
        if (scrollIndicator) scrollIndicator.textContent = t.hero.scrollDown;
        
        // About Section
        const aboutTitle = document.querySelector('#about .section-title');
        if (aboutTitle) aboutTitle.innerHTML = `<span class="title-line"></span>${t.about.title}<span class="title-line"></span>`;
        
        const aboutSubtitle = document.querySelector('#about .section-subtitle');
        if (aboutSubtitle) aboutSubtitle.textContent = t.about.subtitle;
        
        const whoAmI = document.querySelector('.about-text h3');
        if (whoAmI) whoAmI.textContent = t.about.whoAmI;
        
        const aboutParagraphs = document.querySelectorAll('.about-text p');
        if (aboutParagraphs.length >= 2) {
            aboutParagraphs[0].textContent = t.about.description1;
            aboutParagraphs[1].textContent = t.about.description2;
        }
        
        const aboutStatLabels = document.querySelectorAll('.about-stats .stat-label');
        if (aboutStatLabels.length >= 3) {
            aboutStatLabels[0].textContent = t.about.stats.projects;
            aboutStatLabels[1].textContent = t.about.stats.satisfaction;
            aboutStatLabels[2].textContent = t.about.stats.hackathons;
        }
        
        // Timeline
        const timelineTitle = document.querySelector('.timeline-section h3');
        if (timelineTitle) timelineTitle.innerHTML = `<i class="fas fa-graduation-cap"></i> ${t.about.timeline.title}`;
        
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length >= 4) {
            // Education
            const edu = timelineItems[0];
            edu.querySelector('h4').textContent = t.about.timeline.education.title;
            edu.querySelectorAll('.timeline-subtitle')[0].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${t.about.timeline.education.institution}`;
            edu.querySelector('.timeline-date').innerHTML = `<i class="fas fa-calendar"></i> ${t.about.timeline.education.date}`;
            edu.querySelector('.timeline-description').textContent = t.about.timeline.education.description;
            
            // PFE
            const pfe = timelineItems[1];
            pfe.querySelector('h4').textContent = t.about.timeline.pfe.title;
            pfe.querySelectorAll('.timeline-subtitle')[0].innerHTML = `<i class="fas fa-building"></i> ${t.about.timeline.pfe.institution}`;
            pfe.querySelector('.timeline-date').innerHTML = `<i class="fas fa-calendar"></i> ${t.about.timeline.pfe.date}`;
            pfe.querySelector('.timeline-description').textContent = t.about.timeline.pfe.description;
            
            // Hackathons
            const hack = timelineItems[2];
            hack.querySelector('h4').textContent = t.about.timeline.hackathons.title;
            hack.querySelectorAll('.timeline-subtitle')[0].innerHTML = `<i class="fas fa-users"></i> ${t.about.timeline.hackathons.institution}`;
            hack.querySelector('.timeline-date').innerHTML = `<i class="fas fa-calendar"></i> ${t.about.timeline.hackathons.date}`;
            hack.querySelector('.timeline-description').textContent = t.about.timeline.hackathons.description;
            
            // Certifications
            const cert = timelineItems[3];
            cert.querySelector('h4').textContent = t.about.timeline.certifications.title;
            cert.querySelectorAll('.timeline-subtitle')[0].innerHTML = `<i class="fas fa-book-reader"></i> ${t.about.timeline.certifications.institution}`;
            cert.querySelector('.timeline-description').textContent = t.about.timeline.certifications.description;
        }
        
        // Skills Section
        const skillsTitle = document.querySelector('#skills .section-title');
        if (skillsTitle) skillsTitle.innerHTML = `<span class="title-line"></span>${t.skills.title}<span class="title-line"></span>`;
        
        const skillsSubtitle = document.querySelector('#skills .section-subtitle');
        if (skillsSubtitle) skillsSubtitle.textContent = t.skills.subtitle;
        
        // Traduire les catégories de compétences
        const skillCategories = document.querySelectorAll('.skill-category');
        const categoryKeys = ['ai', 'dataScience', 'energy', 'development', 'cv', 'database', 'cloud', 'mobile', 'soft'];
        
        skillCategories.forEach((category, index) => {
            if (categoryKeys[index] && t.skills.categories[categoryKeys[index]]) {
                const catData = t.skills.categories[categoryKeys[index]];
                
                // Traduire le titre de la catégorie
                const h3 = category.querySelector('h3');
                if (h3) h3.textContent = catData.title;
                
                // Traduire les items
                const skillItems = category.querySelectorAll('.skill-item span');
                skillItems.forEach((item, itemIndex) => {
                    if (catData.items && catData.items[itemIndex]) {
                        item.textContent = catData.items[itemIndex];
                    }
                });
            }
        });
        
        // Certifications Section
        const certTitle = document.querySelector('#certifications .section-title');
        if (certTitle) certTitle.innerHTML = `<span class="title-line"></span>${t.certifications.title}<span class="title-line"></span>`;
        
        const certSubtitle = document.querySelector('#certifications .section-subtitle');
        if (certSubtitle) certSubtitle.textContent = t.certifications.subtitle;
        
        const certStats = document.querySelectorAll('.cert-stat-label');
        if (certStats.length >= 3) {
            certStats[0].textContent = t.certifications.stats.total;
            certStats[1].textContent = t.certifications.stats.institutions;
            certStats[2].textContent = t.certifications.stats.continuous;
        }
        
        // Projects Section
        const projectsTitle = document.querySelector('#projects .section-title');
        if (projectsTitle) projectsTitle.innerHTML = `<span class="title-line"></span>${t.projects.title}<span class="title-line"></span>`;
        
        const projectsSubtitle = document.querySelector('#projects .section-subtitle');
        if (projectsSubtitle) projectsSubtitle.textContent = t.projects.subtitle;
        
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length >= 3) {
            // Project 1
            projectCards[0].querySelector('.project-title a').textContent = t.projects.project1.title;
            projectCards[0].querySelector('.project-description').textContent = t.projects.project1.description;
            projectCards[0].querySelector('.project-details-btn').innerHTML = `${t.projects.viewDetails} <i class="fas fa-arrow-right"></i>`;
            
            // Project 2
            projectCards[1].querySelector('.project-title a').textContent = t.projects.project2.title;
            projectCards[1].querySelector('.project-description').textContent = t.projects.project2.description;
            projectCards[1].querySelector('.project-details-btn').innerHTML = `${t.projects.viewDetails} <i class="fas fa-arrow-right"></i>`;
            
            // Project 3
            projectCards[2].querySelector('.project-title a').textContent = t.projects.project3.title;
            projectCards[2].querySelector('.project-description').textContent = t.projects.project3.description;
            projectCards[2].querySelector('.project-details-btn').innerHTML = `${t.projects.viewDetails} <i class="fas fa-arrow-right"></i>`;
        }
        
        // Contact Section
        const contactTitle = document.querySelector('#contact .section-title');
        if (contactTitle) contactTitle.innerHTML = `<span class="title-line"></span>${t.contact.title}<span class="title-line"></span>`;
        
        const contactSubtitle = document.querySelector('#contact .section-subtitle');
        if (contactSubtitle) contactSubtitle.textContent = t.contact.subtitle;
        
        const contactCards = document.querySelectorAll('.contact-card h3');
        if (contactCards.length >= 3) {
            contactCards[0].textContent = t.contact.location;
            contactCards[1].textContent = t.contact.email;
            contactCards[2].textContent = t.contact.phone;
        }
        
        const locationValue = document.querySelector('.contact-card p');
        if (locationValue && locationValue.textContent.includes('Ariana')) {
            locationValue.textContent = t.contact.locationValue;
        }
        
        const socialTitle = document.querySelector('.social-section h3');
        if (socialTitle) socialTitle.textContent = t.contact.social;
        
        // Footer
        const footerText = document.querySelector('.footer-text p');
        if (footerText) {
            footerText.textContent = `© 2026 Razi Sniha. ${t.footer.rights}`;
        }
        
        console.log('✅ Traduction appliquée:', lang);
    }
    
    // Exposer les fonctions globalement si nécessaire
    window.changeLanguage = changeLanguage;
})();
