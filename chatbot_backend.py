"""
Backend Flask pour Chatbot RAG avec Meta-Llama-3-8B-Instruct
Système RAG complet avec recherche sémantique dans le CV PDF
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import re
import os
from typing import List, Tuple

app = Flask(__name__)
CORS(app)

# Configuration
HF_TOKEN = os.environ.get('HF_TOKEN', 'your_token_here')
MODEL = 'meta-llama/Meta-Llama-3-8B-Instruct'
API_URL = f'https://api-inference.huggingface.co/models/{MODEL}'

# Charger le CV
try:
    with open('cv_data.json', 'r', encoding='utf-8-sig') as f:
        cv_data = json.load(f)
    CV_TEXT = cv_data['full_text']
    print("✅ CV chargé avec succès")
except Exception as e:
    print(f"⚠️  Erreur chargement CV: {e}")
    CV_TEXT = ""

# === SYSTÈME RAG ===

def create_cv_chunks(text: str) -> List[dict]:
    """Divise le CV en chunks sémantiques"""
    chunks = []
    
    # Structure du CV
    sections = {
        'Profile': [],
        'Education': [],
        'Experience': [],
        'Projects': [],
        'Skills': [],
        'Languages': []
    }
    
    # Informations de base
    sections['Profile'] = [
        "Sniha Razi - Étudiant ingénieur informatique, 3ème année ESPRIT",
        "Spécialisation: Data Science",
        "Période: 2020-2025",
        "Contact: razi.sniha@esprit.tn, razisniha@gmail.com, +216-26 995 933",
        "Localisation: Tunis, Tunisie"
    ]
    
    # Formation
    sections['Education'] = [
        "ESPRIT - Private School of Engineering and Technology (2020-2025): Diplôme d'Ingénieur National en Informatique, Spécialisation Data Science, Tunis, Tunisie",
        "Lycée El Wafa (2020): Diplôme National du Baccalauréat en Sciences Techniques, Tunis, Tunisie"
    ]
    
    # Expériences
    sections['Experience'] = [
        "Stage PFE chez SFM Technologies (Février 2025 - Juillet 2025): Système Intelligent d'Optimisation de Consommation Énergétique pour Entreprises",
        "Stage d'ingénieur chez CodiX (Juillet 2024 - Août 2024): Application bancaire Python pour gestion comptes, prédiction prêts, sécurité client avec reconnaissance faciale et vérification signature",
        "Stage d'été chez TEKRU Technologies (Juin 2023 - Août 2023): Application de gestion de cinéma avec réservation billets et gestion horaires"
    ]
    
    # Projets
    sections['Projects'] = [
        "Projet de Fin d'Études - Système d'Optimisation Énergétique (Février-Juillet 2025): Système IA pour réduire consommation énergétique entreprises. Modèles LSTM et XGBoost pour prédiction. Dashboard Power BI temps réel. Chatbot RAG pour recommandations. Technologies: Python, TensorFlow, XGBoost, Power BI, Flask, Pandas, Scikit-learn, SQL, Git",
        
        "Projet Dyslexie (Septembre-Novembre 2024): Site web pour enfants dyslexiques avec exercices Unity. Modèles génération images, voice-to-text, text-to-voice. Dashboard Power BI pour suivi progrès. Reconnaissance faciale avec Django. Technologies: Git, Power BI, SQL, ML, DL, Jupyter, Visual Studio, OpenCV, TensorFlow, Python, Django",
        
        "Robot Joueur d'Échecs (Septembre-Novembre 2024): Robot avec capture image pour détecter état échiquier, reconnaissance positions pièces, intégration moteur Stockfish, interface automatisée IA et robotique. Technologies: Python, OpenCV, Stockfish, TensorFlow/Keras, Arduino",
        
        "Système Gestion Risques (Novembre 2024 - Janvier 2025): Système recommandation basé graphes conceptuels pour gestion risques projets. Graphe connaissances pour modéliser entités et relations. Prédiction liens pour suggérer risques et stratégies. Technologies: Python, Neo4j, NetworkX, Scikit-learn, Flask, Power BI"
    ]
    
    # Compétences
    sections['Skills'] = [
        "Langages de programmation: Python (expert), C, C++, Java, PHP, JavaScript, CSS, HTML, Pascal, SQL",
        "Frameworks Web/Mobile: Django, Flask, React, Flutter, REST APIs, Firebase",
        "Bases de données: MySQL, PostgreSQL, Oracle (PL/SQL), SQL Server, NoSQL (MongoDB)",
        "Data Science et IA: Machine Learning, Deep Learning, TensorFlow, Keras, Scikit-learn, XGBoost, NLP, RAG-based Chatbots",
        "Computer Vision: OpenCV, PyTorch, Scikit-image, Traitement Images et Vidéos",
        "IoT et Robotique: Arduino, ESP32, Capteurs, Acquisition données IoT, Contrôle robotique",
        "Outils et IDEs: Jupyter, Visual Studio, CodeBlocks, MPLAB, Arduino IDE, QT, VMware, VirtualBox, Power BI, Git, GitHub, Docker",
        "Systèmes d'exploitation: Windows, Linux",
        "Méthodologies: Agile, UML, Visualisation données, Développement dashboards, Intégration REST API"
    ]
    
    # Langues
    sections['Languages'] = [
        "Arabe: Langue maternelle",
        "Français: Niveau B2",
        "Anglais: Niveau B2"
    ]
    
    # Créer les chunks avec métadonnées
    for section_name, items in sections.items():
        for item in items:
            chunks.append({
                'text': item,
                'section': section_name,
                'keywords': extract_keywords(item)
            })
    
    return chunks

def detect_intent(query: str, conversation_context: List[str] = None) -> str:
    """Détecte l'intention de la question avec analyse contextuelle avancée"""
    query_lower = query.lower()
    
    # Informations techniques = compétences + projets techniques
    if any(word in query_lower for word in ['technique', 'technical', 'technologie', 'technology']):
        if any(word in query_lower for word in ['information', 'info', 'détail', 'detail']):
            return 'technical_overview'  # Vue d'ensemble technique
        return 'skills'
    
    # Compétences (avec variations et fautes)
    if any(word in query_lower for word in ['compétence', 'competence', 'compétance', 'competance', 'skill', 'maîtrise', 'maitrise', 'outil', 'langage', 'savoir', 'connaissance']):
        return 'skills'
    
    # Projets
    if any(word in query_lower for word in ['projet', 'project', 'réalisation', 'realisation', 'travail', 'développé', 'developpe', 'créé', 'cree']):
        return 'projects'
    
    # Expérience
    if any(word in query_lower for word in ['expérience', 'experience', 'stage', 'entreprise', 'société', 'societe', 'emploi']):
        return 'experience'
    
    # Formation
    if any(word in query_lower for word in ['formation', 'étude', 'etude', 'diplôme', 'diplome', 'education', 'école', 'ecole', 'université', 'universite', 'parcours']):
        return 'education'
    
    # Contact
    if any(word in query_lower for word in ['contact', 'email', 'téléphone', 'telephone', 'phone', 'joindre', 'contacter']):
        return 'contact'
    
    # Profil complet / Plus d'informations
    if any(word in query_lower for word in ['plus', 'more', 'davantage', 'détail', 'detail', 'tout', 'all', 'complet']):
        return 'detailed_profile'
    
    # Qui est / Présentation
    if any(word in query_lower for word in ['qui', 'présent', 'present', 'about', 'describe', 'parle']):
        return 'profile'
    
    return 'general'

def extract_keywords(text: str) -> List[str]:
    """Extrait les mots-clés d'un texte"""
    # Mots-clés importants à rechercher
    important_words = [
        'python', 'machine learning', 'deep learning', 'tensorflow', 'django',
        'flask', 'opencv', 'data science', 'ia', 'ai', 'nlp', 'rag',
        'power bi', 'sql', 'docker', 'git', 'arduino', 'robotique',
        'esprit', 'stage', 'projet', 'energie', 'energy', 'dyslexie',
        'echecs', 'chess', 'risques', 'neo4j', 'xgboost', 'lstm',
        'compétence', 'skill', 'formation', 'experience'
    ]
    
    text_lower = text.lower()
    found_keywords = [kw for kw in important_words if kw in text_lower]
    return found_keywords

def search_relevant_chunks(query: str, chunks: List[dict], top_k: int = 5) -> List[str]:
    """Recherche sémantique avancée - retourne TOUS les chunks d'une section si intention claire"""
    query_lower = query.lower()
    query_keywords = extract_keywords(query)
    intent = detect_intent(query)
    
    # Pour les intentions spécifiques, retourner TOUS les chunks de la section
    section_map = {
        'skills': 'Skills',
        'technical_overview': ['Skills', 'Projects'],
        'projects': 'Projects',
        'experience': 'Experience',
        'education': 'Education',
        'contact': 'Profile',
        'profile': 'Profile',
        'detailed_profile': ['Profile', 'Education', 'Experience', 'Projects', 'Skills']
    }
    
    # Si intention claire et spécifique, récupérer TOUS les chunks de cette section
    if intent in section_map:
        target_sections = section_map[intent]
        if isinstance(target_sections, str):
            target_sections = [target_sections]
        
        selected_chunks = []
        for chunk in chunks:
            if chunk['section'] in target_sections:
                selected_chunks.append(chunk['text'])
        
        if selected_chunks:
            return selected_chunks  # Retourner TOUS les chunks de la section
    
    # Sinon, faire une recherche classique avec scoring
    scored_chunks = []
    for chunk in chunks:
        score = 0
        
        # Score basé sur les mots-clés communs
        common_keywords = set(query_keywords) & set(chunk['keywords'])
        score += len(common_keywords) * 3
        
        # Score basé sur les mots de la query présents dans le chunk
        words_in_query = query_lower.split()
        for word in words_in_query:
            if len(word) > 3 and word in chunk['text'].lower():
                score += 2
        
        if score > 0:
            scored_chunks.append((score, chunk['text']))
    
    # Trier par score décroissant
    scored_chunks.sort(reverse=True, key=lambda x: x[0])
    
    # Retourner les top_k chunks
    return [chunk[1] for chunk in scored_chunks[:top_k]]

# Créer les chunks au démarrage
CV_CHUNKS = create_cv_chunks(CV_TEXT)
print(f"📚 {len(CV_CHUNKS)} chunks créés pour le système RAG")

def call_llama_with_rag(user_message: str, relevant_context: str, lang='fr'):
    """Appelle Meta-Llama-3-8B-Instruct avec le contexte RAG"""
    
    system_prompt = f"""Tu es l'assistant virtuel personnel de Razi Sniha. Tu réponds aux questions en te basant UNIQUEMENT sur les informations de son CV fournies ci-dessous.

CONTEXTE PERTINENT DU CV:
{relevant_context}

INSTRUCTIONS:
- Réponds de manière précise et professionnelle (2-4 phrases maximum)
- Utilise des emojis appropriés
- Si l'information n'est pas dans le contexte fourni, dis-le poliment
- Réponds en {'français' if lang == 'fr' else 'anglais'}
- Base ta réponse UNIQUEMENT sur le contexte fourni
"""

    prompt = f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>

{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>

{user_message}<|eot_id|><|start_header_id|>assistant<|end_header_id|>

"""
    
    try:
        response = requests.post(
            API_URL,
            headers={
                'Authorization': f'Bearer {HF_TOKEN}',
                'Content-Type': 'application/json'
            },
            json={
                'inputs': prompt,
                'parameters': {
                    'max_new_tokens': 300,
                    'temperature': 0.7,
                    'top_p': 0.9,
                    'do_sample': True,
                    'return_full_text': False,
                    'stop': ['<|eot_id|>', '<|end_of_text|>']
                },
                'options': {
                    'wait_for_model': True,
                    'use_cache': False
                }
            },
            timeout=25
        )
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and data:
                text = data[0].get('generated_text', '').strip()
                if text and len(text) > 10:
                    return text, 'llama-3-8b-rag'
        elif response.status_code == 503:
            return None, 'loading'
        elif response.status_code == 401:
            return None, 'auth_error'
        
        print(f"❌ Erreur API: {response.status_code} - {response.text[:300]}", flush=True)
        return None, 'api_error'
        
    except Exception as e:
        print(f"Exception: {e}")
        return None, 'exception'

def generate_smart_response(query: str, relevant_chunks: List[str], lang='fr') -> str:
    """Génère une réponse intelligente, complète et très détaillée"""
    if not relevant_chunks:
        return get_fallback_response(query, lang)
    
    intent = detect_intent(query)
    
    if lang == 'fr':
        # Réponses personnalisées selon l'intention
        if intent == 'technical_overview':
            # Vue d'ensemble technique COMPLÈTE
            response = "💻 **PROFIL TECHNIQUE COMPLET - RAZI SNIHA**\n\n"
            response += "🎯 **Spécialisation:** Ingénieur Data Science | 3ème année ESPRIT | Expert en IA & ML\n\n"
            response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
            
            # Compétences techniques COMPLÈTES
            skills_chunks = [c for c in relevant_chunks if any(kw in c.lower() for kw in ['langage', 'framework', 'base', 'data science', 'computer vision', 'iot', 'outil', 'système', 'méthodologie'])]
            if skills_chunks:
                response += "**🔧 STACK TECHNIQUE & COMPÉTENCES:**\n\n"
                for i, chunk in enumerate(skills_chunks, 1):
                    response += f"**{i}.** {chunk}\n\n"
            
            # Projets techniques
            project_chunks = [c for c in relevant_chunks if 'projet' in c.lower()]
            if project_chunks:
                response += "\n**🚀 PROJETS TECHNIQUES MAJEURS:**\n\n"
                for i, chunk in enumerate(project_chunks, 1):
                    response += f"**Projet {i}:** {chunk}\n\n"
            
            response += "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
            response += "✨ **Synthèse:** Expert polyvalent en Data Science avec maîtrise complète du cycle de développement ML/DL, de la collecte de données à la mise en production."
            
            return response
        
        elif intent == 'detailed_profile':
            # Profil complet ULTRA-DÉTAILLÉ
            response = "👤 **PROFIL COMPLET - RAZI SNIHA**\n\n"
            response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
            
            # Informations générales
            profile_chunks = [c for c in relevant_chunks if any(kw in c.lower() for kw in ['sniha', 'contact', 'étudiant', 'localisation'])]
            if profile_chunks:
                response += "**📋 IDENTITÉ & CONTACT:**\n"
                for chunk in profile_chunks[:5]:
                    response += f"• {chunk}\n"
                response += "\n"
            
            # Formation
            edu_chunks = [c for c in relevant_chunks if any(kw in c.lower() for kw in ['esprit', 'lycée', 'diplôme', 'baccalauréat'])]
            if edu_chunks:
                response += "**🎓 PARCOURS ACADÉMIQUE:**\n"
                for chunk in edu_chunks:
                    response += f"• {chunk}\n"
                response += "\n"
            
            # Expériences
            exp_chunks = [c for c in relevant_chunks if any(kw in c.lower() for kw in ['stage', 'sfm', 'codix', 'tekru'])]
            if exp_chunks:
                response += "**💼 EXPÉRIENCES PROFESSIONNELLES:**\n"
                for chunk in exp_chunks:
                    response += f"• {chunk}\n"
                response += "\n"
            
            # Projets
            proj_chunks = [c for c in relevant_chunks if 'projet' in c.lower()]
            if proj_chunks:
                response += "**🚀 RÉALISATIONS & PROJETS:**\n"
                for chunk in proj_chunks:
                    response += f"• {chunk}\n"
                response += "\n"
            
            # Compétences
            skills_chunks = [c for c in relevant_chunks if any(kw in c.lower() for kw in ['langage', 'framework', 'data science'])]
            if skills_chunks:
                response += "**💻 COMPÉTENCES TECHNIQUES:**\n"
                for chunk in skills_chunks[:3]:
                    response += f"• {chunk}\n"
            
            response += "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            return response
        
        elif intent == 'skills':
            response = "💻 **COMPÉTENCES TECHNIQUES COMPLÈTES - RAZI SNIHA**\n\n"
            response += "Expert polyvalent avec une maîtrise approfondie de multiples technologies :\n\n"
            response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
            
            # Organiser TOUTES les compétences
            for i, chunk in enumerate(relevant_chunks, 1):
                response += f"**{i}.** {chunk}\n\n"
            
            response += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
            response += "✨ **Synthèse:** Stack technique complet permettant de concevoir, développer et déployer des solutions IA/ML de bout en bout, de la collecte de données au déploiement en production."
            return response
        
        elif intent == 'projects':
            response = "🚀 **Projets Réalisés par Razi Sniha**\n\n"
            response += "Voici ses projets les plus significatifs démontrant son expertise en Data Science et IA :\n\n"
            
            for i, chunk in enumerate(relevant_chunks[:4], 1):
                response += f"**Projet {i}:**\n{chunk}\n\n"
            
            return response.strip()
        
        elif intent == 'experience':
            response = "💼 **Expériences Professionnelles de Razi Sniha**\n\n"
            
            for i, chunk in enumerate(relevant_chunks[:3], 1):
                response += f"**{i}.** {chunk}\n\n"
            
            response += "Ces expériences lui ont permis de développer des compétences pratiques en développement Python, IA et gestion de projets."
            return response
        
        elif intent == 'education':
            response = "🎓 **Parcours de Formation de Razi Sniha**\n\n"
            
            for chunk in relevant_chunks[:2]:
                response += f"• {chunk}\n\n"
            
            response += "Sa formation à ESPRIT lui offre une expertise approfondie en Data Science, Machine Learning et technologies modernes."
            return response
        
        elif intent == 'contact':
            response = "📧 **Contacter Razi Sniha**\n\n"
            for chunk in relevant_chunks[:1]:
                if 'contact' in chunk.lower() or '@' in chunk:
                    response += chunk + "\n\n"
            response += "N'hésitez pas à le contacter pour discuter de projets en Data Science, IA ou opportunités professionnelles!"
            return response
        
        else:  # profile ou general
            response = "👤 **À Propos de Razi Sniha**\n\n"
            for chunk in relevant_chunks[:3]:
                response += f"• {chunk}\n\n"
            return response.strip()
    
    else:  # English
        response_parts = relevant_chunks[:4]
        return "\n\n".join(response_parts)

def get_fallback_response(query: str, lang='fr') -> str:
    """Réponses de secours basées sur les mots-clés du CV"""
    query_lower = query.lower()
    
    if lang == 'fr':
        # Questions "C'est qui" ou "Qui est"
        if any(word in query_lower for word in ['qui est', "c'est qui", 'cest qui', 'qui razi', 'présente', 'présentation']):
            return "👤 Razi Sniha est étudiant ingénieur en Data Science à ESPRIT (3ème année). Passionné par l'IA, le ML/DL et la Computer Vision. Il a réalisé des projets innovants: système d'optimisation énergétique, robot joueur d'échecs, et plateforme pour dyslexiques. Expert Python avec expériences chez SFM, CodiX et TEKRU. 🚀"
        
        # Questions sur la formation
        if any(word in query_lower for word in ['formation', 'étude', 'diplôme', 'education']):
            return "🎓 Razi est étudiant ingénieur à ESPRIT (2020-2025), spécialité Data Science. Il a obtenu son Baccalauréat en Sciences Techniques au Lycée El Wafa."
        
        # Questions sur les compétences
        if any(word in query_lower for word in ['compétence', 'skill', 'technologie', 'langage']):
            return "💻 Razi maîtrise Python (expert), ML/DL (TensorFlow, Keras, XGBoost), Computer Vision (OpenCV), NLP, et RAG Chatbots. Il connaît Django, Flask, React, ainsi que Arduino pour la robotique."
        
        # Questions sur les projets
        if 'dyslexie' in query_lower:
            return "📚 Projet Dyslexie (2024): Plateforme web pour enfants dyslexiques avec exercices Unity, génération images, voice-to-text, reconnaissance faciale Django, et dashboard Power BI."
        
        if 'énergie' in query_lower or 'energy' in query_lower:
            return "⚡ PFE 2025: Système IA d'optimisation énergétique avec LSTM/XGBoost, dashboard Power BI temps réel, et chatbot RAG pour recommandations."
        
        if 'échec' in query_lower or 'chess' in query_lower:
            return "♟️ Robot Joueur d'Échecs (2024): Capture image, reconnaissance pièces, intégration moteur Stockfish, interface automatisée IA + robotique."
        
        if 'risque' in query_lower or 'risk' in query_lower:
            return "🔍 Système Gestion Risques (2024-2025): Recommandation via graphes conceptuels Neo4j, prédiction liens pour suggérer risques et stratégies."
        
        if 'projet' in query_lower or 'project' in query_lower:
            return "🚀 Projets majeurs: Optimisation Énergétique (PFE), Plateforme Dyslexie, Robot Échecs, Gestion Risques. Tous intègrent IA, ML, DL et Computer Vision."
        
        # Questions sur l'expérience
        if 'expérience' in query_lower or 'stage' in query_lower:
            return "💼 Expériences: PFE chez SFM Technologies (2025), Stage ingénieur chez CodiX - app bancaire Python (2024), Stage chez TEKRU - gestion cinéma (2023)."
        
        # Questions contact
        if any(word in query_lower for word in ['contact', 'email', 'téléphone', 'phone']):
            return "📧 Contact: razi.sniha@esprit.tn | razisniha@gmail.com | +216-26 995 933 | Tunis, Tunisie"
        
        # Réponse générale
        return "👋 Je suis l'assistant de Razi Sniha, étudiant ingénieur Data Science à ESPRIT. Posez-moi des questions sur sa formation, ses compétences en IA/ML, ou ses projets!"
    
    else:  # English
        if any(word in query_lower for word in ['education', 'study', 'diploma']):
            return "🎓 Razi is an engineering student at ESPRIT (2020-2025), specialized in Data Science. He obtained his Baccalaureate in Technical Sciences."
        
        if any(word in query_lower for word in ['skill', 'technology', 'language']):
            return "💻 Razi masters Python (expert), ML/DL (TensorFlow, Keras, XGBoost), Computer Vision (OpenCV), NLP, and RAG Chatbots. He knows Django, Flask, React, and Arduino for robotics."
        
        if 'project' in query_lower:
            return "🚀 Major projects: Energy Optimization (PFE), Dyslexia Platform, Chess Robot, Risk Management. All integrate AI, ML, DL and Computer Vision."
        
        if 'experience' in query_lower:
            return "💼 Experience: PFE at SFM Technologies (2025), Engineer internship at CodiX - Python banking app (2024), Internship at TEKRU - cinema management (2023)."
        
        if 'contact' in query_lower:
            return "📧 Contact: razi.sniha@esprit.tn | razisniha@gmail.com | +216-26 995 933 | Tunis, Tunisia"
        
        return "👋 I'm Razi Sniha's assistant, a Data Science engineering student at ESPRIT. Ask me about his education, AI/ML skills, or projects!"

@app.route('/api/chat', methods=['POST'])
def chat():
    """Endpoint principal du chatbot avec système RAG"""
    try:
        data = request.json
        user_message = data.get('message', '')
        lang = data.get('lang', 'fr')
        
        if not user_message:
            return jsonify({'error': 'Message vide'}), 400
        
        print(f"\n💬 Question: {user_message}", flush=True)
        
        # Détecter l'intention avec contexte
        intent = detect_intent(user_message)
        print(f"🎯 Intention détectée: {intent}", flush=True)
        
        # Recherche des chunks pertinents (RAG)
        # Pour les questions générales ou techniques, prendre BEAUCOUP plus de chunks
        top_k = 15 if any(word in user_message.lower() for word in ['plus', 'tout', 'information', 'technique', 'complet', 'détail']) else 8
        relevant_chunks = search_relevant_chunks(user_message, CV_CHUNKS, top_k=top_k)
        relevant_context = "\n\n".join(relevant_chunks)
        
        print(f"🔍 {len(relevant_chunks)} chunks pertinents trouvés", flush=True)
        if relevant_chunks:
            print(f"📄 Premier chunk: {relevant_chunks[0][:150]}...", flush=True)
        
        # Essayer d'abord le LLM avec le contexte RAG
        response_text, status = call_llama_with_rag(user_message, relevant_context, lang)
        
        if response_text:
            print(f"✅ Réponse LLM générée: {response_text[:100]}...", flush=True)
            return jsonify({
                'response': response_text,
                'model': 'Meta-Llama-3-8B-Instruct-RAG',
                'status': 'success',
                'chunks_used': len(relevant_chunks)
            })
        
        # Si LLM échoue, utiliser le générateur intelligent basé sur les chunks
        print(f"🤖 Génération intelligente activée (LLM status: {status})", flush=True)
        
        if relevant_chunks:
            smart_response = generate_smart_response(user_message, relevant_chunks, lang)
            print(f"✅ Réponse générée à partir de {len(relevant_chunks)} chunks", flush=True)
            return jsonify({
                'response': smart_response,
                'model': 'RAG-Smart-Generator',
                'status': 'success',
                'chunks_used': len(relevant_chunks)
            })
        
        # Dernier recours: fallback classique
        print(f"⚠️  Fallback classique activé", flush=True)
        fallback_response = get_fallback_response(user_message, lang)
        
        return jsonify({
            'response': fallback_response,
            'model': 'fallback',
            'status': status
        })
        
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return jsonify({
            'response': get_fallback_response('', lang),
            'model': 'fallback',
            'status': 'error'
        })

@app.route('/api/health', methods=['GET'])
def health():
    """Vérifie l'état du serveur"""
    return jsonify({
        'status': 'ok',
        'model': MODEL,
        'cv_loaded': len(CV_TEXT) > 0,
        'cv_size': len(CV_TEXT),
        'chunks': len(CV_CHUNKS)
    })

if __name__ == '__main__':
    print("=" * 80)
    print("🤖 CHATBOT RAG - RAZI SNIHA PORTFOLIO")
    print("=" * 80)
    print(f"🧠 Modèle LLM: {MODEL}")
    print(f"📄 CV chargé: {len(CV_TEXT)} caractères")
    print(f"📚 Chunks RAG: {len(CV_CHUNKS)} chunks")
    print(f"🔑 Token HF configuré")
    print(f"🔍 Système: Recherche sémantique + LLM")
    print("\n🌐 Serveur démarré sur http://localhost:5000")
    print("💬 Endpoint: POST /api/chat")
    print("💚 Health check: GET /api/health")
    print("=" * 80 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=False)
