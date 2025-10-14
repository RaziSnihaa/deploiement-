# Guide pour la Page de Projet avec Vidéo

## 🎬 Comment ajouter votre vidéo de démonstration

### 1. **Préparez votre vidéo**
- **Format recommandé** : MP4 (plus compatible)
- **Résolution** : 1920x1080 (Full HD) ou 1280x720 (HD)
- **Durée** : 2-5 minutes (optimal pour démonstration)
- **Taille** : < 50MB pour un chargement rapide
- **Contenu** : Démonstration des fonctionnalités principales

### 2. **Optimisez votre vidéo**
```bash
# Avec FFmpeg (si disponible) :
ffmpeg -i votre-demo.mp4 -vf "scale=1280:720" -c:v libx264 -crf 23 -c:a aac -b:a 128k projet1-demo.mp4

# Ou utilisez des outils en ligne :
# - CloudConvert.com
# - Online-Convert.com
# - HandBrake (logiciel gratuit)
```

### 3. **Ajoutez vos fichiers**
```
videos/
├── projet1-demo.mp4      ← Votre vidéo principale
├── projet1-demo.webm     ← Version alternative (optionnel)
└── ...

images/
├── project1-poster.jpg   ← Image de couverture (1280x720)
├── projet1-screen1.jpg   ← Capture d'écran 1
├── projet1-screen2.jpg   ← Capture d'écran 2
├── projet1-screen3.jpg   ← Capture d'écran 3
└── projet1-screen4.jpg   ← Capture d'écran 4
```

## 📝 Personnalisation de la page

### **Modifier le contenu**
Éditez le fichier `projet1.html` :

1. **Titre et description** (lignes 20-25)
2. **Métadonnées** (lignes 35-50)
3. **Technologies utilisées** (sidebar)
4. **Fonctionnalités** (section principale)
5. **Liens vers projet/GitHub** (sidebar)

### **Ajouter vos vraies données**
```html
<!-- Remplacez ces éléments : -->
<h1 class="project-title">VOTRE TITRE</h1>
<p class="project-subtitle">VOTRE DESCRIPTION</p>

<!-- Technologies : -->
<span class="tech-tag">VOS TECHNOLOGIES</span>

<!-- Liens : -->
<a href="VOTRE-LIEN" class="project-link-btn">
```

## 🎯 Fonctionnalités incluses

### **Page complète avec :**
- ✅ **Navigation** avec retour au portfolio
- ✅ **Vidéo de démonstration** avec contrôles personnalisés
- ✅ **Description détaillée** avec sections organisées
- ✅ **Technologies utilisées** dans une sidebar
- ✅ **Galerie de captures d'écran**
- ✅ **Statistiques du projet**
- ✅ **Liens vers code/démo**
- ✅ **Navigation entre projets**
- ✅ **Design responsive**

### **Interactivité JavaScript :**
- ✅ Lecteur vidéo personnalisé
- ✅ Animations au scroll
- ✅ Statistiques animées
- ✅ Gestion d'erreurs
- ✅ Lazy loading des images

## 🚀 Test de la nouvelle page

1. **Accédez au portfolio** : http://localhost:8000
2. **Cliquez sur le projet 1** ou visitez directement : http://localhost:8000/projet1.html
3. **Testez toutes les fonctionnalités** :
   - Navigation
   - Vidéo (bouton play)
   - Scroll et animations
   - Liens
   - Responsive design

## 📱 Structure de la page

### **Sections créées :**
1. **Header** - Titre, description, métadonnées
2. **Vidéo** - Lecteur avec contrôles personnalisés
3. **Détails** - Description complète avec sidebar
4. **Captures d'écran** - Galerie d'images
5. **Navigation** - Liens vers autres projets

### **Layout responsive :**
- **Desktop** : Sidebar à droite, contenu principal à gauche
- **Tablette** : Stack vertical avec espacements adaptés
- **Mobile** : Une colonne, optimisé pour touch

## 🎨 Personnalisation avancée

### **Modifier les couleurs**
Dans `css/project-page.css` :
```css
:root {
    --project-primary: #votre-couleur;
    --project-accent: #votre-couleur;
}
```

### **Ajouter d'autres projets**
1. Dupliquez `projet1.html` → `projet2.html`
2. Modifiez le contenu
3. Mettez à jour les liens de navigation

### **Modifier la vidéo**
```html
<video id="project-video" controls poster="images/votre-poster.jpg">
    <source src="videos/votre-video.mp4" type="video/mp4">
</video>
```

## 🔧 Dépannage

### **La vidéo ne se charge pas :**
1. Vérifiez le nom du fichier : `videos/projet1-demo.mp4`
2. Vérifiez le format (MP4 recommandé)
3. Vérifiez la taille (< 50MB)
4. Consultez la console du navigateur (F12)

### **Les images ne s'affichent pas :**
1. Vérifiez les noms des fichiers dans `images/`
2. Le système affiche des placeholders automatiquement
3. Formats supportés : JPG, PNG, WebP

### **Navigation ne fonctionne pas :**
1. Vérifiez que `index.html` est dans le même dossier
2. Testez les liens dans la navigation

## 📊 Métriques recommandées

### **Pour votre vidéo :**
- **Durée** : 2-5 minutes
- **Qualité** : 720p minimum
- **Format** : MP4 (H.264)
- **Taille** : 10-50MB

### **Pour vos images :**
- **Captures d'écran** : 800x600 ou 1200x900
- **Poster vidéo** : 1280x720
- **Format** : JPG (photos), PNG (screenshots)
- **Qualité** : 80-90% compression

## 🎉 Résultat final

Votre projet 1 dispose maintenant de :
- Une page dédiée professionnelle
- Vidéo de démonstration intégrée
- Description complète et détaillée
- Navigation fluide depuis le portfolio
- Design moderne et responsive

**Votre portfolio passe au niveau supérieur !** 🚀