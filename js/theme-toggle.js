// ===================================
// THEME TOGGLE - Dark/Light Mode
// ===================================

(function() {
    'use strict';
    
    // Initialiser dès que le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
    
    function initTheme() {
        console.log('🎨 Initialisation du theme toggle...');
        
        const themeToggle = document.getElementById('theme-toggle');
        
        if (!themeToggle) {
            console.error('❌ Bouton theme-toggle introuvable !');
            return;
        }
        
        console.log('✅ Bouton trouvé:', themeToggle);
        
        const html = document.documentElement;
        const icon = themeToggle.querySelector('i');
        
        // Charger le thème sauvegardé ou utiliser dark par défaut
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        console.log('📦 Thème sauvegardé:', savedTheme);
        
        // Appliquer le thème initial
        applyTheme(savedTheme);
        
        // Ajouter l'event listener avec une fonction simple
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Clic détecté sur le bouton !');
            
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log('🔄 Changement:', currentTheme, '→', newTheme);
            
            applyTheme(newTheme);
            
            // Sauvegarder le nouveau thème
            localStorage.setItem('portfolio-theme', newTheme);
            console.log('💾 Thème sauvegardé:', newTheme);
        }, false);
        
        console.log('✅ Theme toggle initialisé avec succès !');
        
        function applyTheme(theme) {
            console.log('🎨 Application du thème:', theme);
            
            // Appliquer l'attribut data-theme
            html.setAttribute('data-theme', theme);
            
            // Mettre à jour l'icône
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-moon';
                    console.log('🌙 Icône: lune');
                } else {
                    icon.className = 'fas fa-sun';
                    console.log('☀️ Icône: soleil');
                }
            }
            
            // Animation du bouton
            themeToggle.classList.add('rotating');
            setTimeout(function() {
                themeToggle.classList.remove('rotating');
            }, 500);
            
            console.log('✅ Thème appliqué:', theme);
        }
    }
})();
