# Guide pour ajouter Photo et Vidéo de Profil

## 📸 Comment ajouter votre photo de profil

1. **Préparez votre photo** :
   - Format recommandé : JPG ou PNG
   - Taille recommandée : 400x400 pixels (carré)
   - Qualité : Bonne résolution mais pas trop lourde (< 500KB)

2. **Ajoutez votre photo** :
   - Renommez votre photo en `profile.jpg`
   - Placez-la dans le dossier `images/`
   - Remplacez le fichier existant si nécessaire

## 🎥 Comment ajouter votre vidéo de profil

1. **Préparez votre vidéo** :
   - Format recommandé : MP4 (plus compatible) et/ou WebM (plus léger)
   - Durée recommandée : 10-30 secondes
   - Résolution : 400x400 pixels (carré) ou 16:9 recadrée
   - Taille : < 5MB pour un chargement rapide

2. **Optimisez votre vidéo** :
   ```bash
   # Avec FFmpeg (si installé) :
   ffmpeg -i votre-video.mp4 -vf "scale=400:400:force_original_aspect_ratio=increase,crop=400:400" -c:v libx264 -crf 28 -c:a aac -b:a 64k profile-video.mp4
   
   # Ou utilisez des outils en ligne comme :
   # - CloudConvert.com
   # - Online-Convert.com
   # - Handbrake (logiciel gratuit)
   ```

3. **Ajoutez votre vidéo** :
   - Renommez votre vidéo en `profile-video.mp4`
   - Placez-la dans le dossier `videos/`
   - Optionnel : Créez aussi une version WebM pour `profile-video.webm`

## 🎛️ Fonctionnalités ajoutées

### Contrôles dans votre portfolio :
- **Bouton caméra** 📷 : Affiche la photo de profil
- **Bouton vidéo** 🎥 : Affiche la vidéo de profil
- **Auto-play** : La vidéo se lance automatiquement (si le navigateur l'autorise)
- **Overlay** : Informations qui apparaissent au survol

### Responsive :
- S'adapte automatiquement à tous les écrans
- Contrôles repositionnés sur mobile
- Qualité optimisée selon l'appareil

## 📁 Structure des fichiers

```
portfolio razi sniha/
├── images/
│   └── profile.jpg          ← Votre photo de profil
├── videos/
│   ├── profile-video.mp4    ← Votre vidéo (format principal)
│   └── profile-video.webm   ← Votre vidéo (format alternatif, optionnel)
└── ...
```

## 🎨 Personnalisation avancée

### Modifier les dimensions :
Dans `css/style.css`, modifiez :
```css
.hero-avatar {
    width: 350px;  /* Changez cette valeur */
    height: 350px; /* Changez cette valeur */
}
```

### Changer les couleurs des boutons :
```css
.media-btn.active {
    background: #your-color; /* Votre couleur */
}
```

### Modifier l'overlay :
Dans `index.html`, changez le contenu de `.profile-info` :
```html
<div class="profile-info">
    <h3>Votre Nom</h3>
    <p>Votre Titre</p>
</div>
```

## 🔧 Dépannage

### La photo ne s'affiche pas :
1. Vérifiez que le fichier s'appelle exactement `profile.jpg`
2. Vérifiez qu'il est dans le dossier `images/`
3. Essayez de rafraîchir la page (Ctrl+F5)

### La vidéo ne se lance pas :
1. Vérifiez le format (MP4 recommandé)
2. Vérifiez la taille (< 5MB)
3. Certains navigateurs bloquent l'autoplay
4. Vérifiez que le fichier s'appelle `profile-video.mp4`

### Les contrôles ne fonctionnent pas :
1. Ouvrez les outils développeur (F12)
2. Vérifiez la console pour les erreurs
3. Assurez-vous que JavaScript est activé

## 🚀 Test

Après avoir ajouté vos fichiers :
1. Rafraîchissez la page
2. Testez les boutons de basculement
3. Vérifiez sur mobile
4. Testez avec différents navigateurs

## 💡 Conseils

- **Photo** : Utilisez un fond uni ou flou pour un rendu professionnel
- **Vidéo** : Évitez les mouvements trop rapides, préférez une présentation calme
- **Qualité** : Équilibrez qualité et taille de fichier
- **Backup** : Gardez toujours la photo comme solution de secours

---

Votre portfolio supporte maintenant photo ET vidéo de profil ! 🎉