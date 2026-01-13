// ===================================
// CHATBOT RAG - Razi Sniha Portfolio
// Powered by Meta-Llama-3-8B-Instruct
// ===================================

(function() {
    'use strict';
    
    const BACKEND_URL = 'http://localhost:5000/api/chat';
    
    let currentLang = localStorage.getItem('portfolio-lang') || 'fr';
    let messagesContainer, inputField, suggestionsContainer;
    
    const translations = {
        fr: {
            welcome: "Bonjour ! 👋 Je suis l'assistant virtuel de Razi Sniha. Je connais tout son parcours grâce à son CV. Posez-moi vos questions !",
            placeholder: "Posez votre question...",
            suggestions: ["Formation", "Compétences", "Projets", "Contact"],
            error: "🔌 Erreur de connexion au serveur. Assurez-vous que le backend est démarré."
        },
        en: {
            welcome: "Hello! 👋 I'm Razi Sniha's virtual assistant. I know all about his background from his CV. Ask me anything!",
            placeholder: "Ask your question...",
            suggestions: ["Education", "Skills", "Projects", "Contact"],
            error: "🔌 Connection error. Make sure the backend is running."
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
    
    function initChatbot() {
        console.log('🤖 Initialisation du chatbot RAG...');
        createChatbotUI();
        
        window.addEventListener('storage', (e) => {
            if (e.key === 'portfolio-lang') {
                currentLang = e.newValue || 'fr';
                updateLanguage();
            }
        });
        
        console.log('✅ Chatbot initialisé !');
    }
    
    function createChatbotUI() {
        const html = `
            <button class="chatbot-button" id="chatbot-toggle">
                <i class="fas fa-comments"></i>
            </button>
            
            <div class="chatbot-window" id="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">🤖</div>
                        <div class="chatbot-header-text">
                            <h3>Assistant Razi</h3>
                            <p>En ligne • Powered by AI</p>
                        </div>
                    </div>
                    <button class="chatbot-close" id="chatbot-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="chatbot-messages" id="chatbot-messages"></div>
                
                <div class="chatbot-suggestions" id="chatbot-suggestions"></div>
                
                <div class="chatbot-input">
                    <input type="text" id="chatbot-input-field" placeholder="${translations[currentLang].placeholder}">
                    <button class="chatbot-send" id="chatbot-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
        
        messagesContainer = document.getElementById('chatbot-messages');
        inputField = document.getElementById('chatbot-input-field');
        suggestionsContainer = document.getElementById('chatbot-suggestions');
        
        document.getElementById('chatbot-toggle').addEventListener('click', toggleChatbot);
        document.getElementById('chatbot-close').addEventListener('click', closeChatbot);
        document.getElementById('chatbot-send').addEventListener('click', sendMessage);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        addBotMessage(translations[currentLang].welcome);
        updateSuggestions();
    }
    
    function toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-toggle');
        window.classList.toggle('active');
        button.classList.toggle('active');
        if (window.classList.contains('active')) inputField.focus();
    }
    
    function closeChatbot() {
        document.getElementById('chatbot-window').classList.remove('active');
        document.getElementById('chatbot-toggle').classList.remove('active');
    }
    
    function updateSuggestions() {
        const suggestions = translations[currentLang].suggestions;
        suggestionsContainer.innerHTML = suggestions.map(s => 
            `<button class="suggestion-btn" onclick="window.sendChatbotSuggestion('${s}')">${s}</button>`
        ).join('');
    }
    
    function sendMessage() {
        const message = inputField.value.trim();
        if (!message) return;
        
        addUserMessage(message);
        inputField.value = '';
        suggestionsContainer.style.display = 'none';
        
        showTypingIndicator();
        
        setTimeout(() => {
            callBackend(message);
        }, 300);
    }
    
    async function callBackend(userMessage) {
        console.log('📡 Envoi au backend:', userMessage);
        
        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    lang: currentLang
                }),
                signal: AbortSignal.timeout(30000)
            });
            
            hideTypingIndicator();
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Réponse reçue:', data);
            
            if (data.response) {
                addBotMessage(data.response);
            } else {
                throw new Error('Pas de réponse');
            }
            
        } catch (error) {
            hideTypingIndicator();
            console.error('❌ Erreur:', error);
            
            let errorMsg = translations[currentLang].error;
            if (error.message.includes('Failed to fetch')) {
                errorMsg += '\n\nDémarrez le backend avec: python chatbot_backend.py';
            }
            addBotMessage(errorMsg);
        }
    }
    
    function showTypingIndicator() {
        const html = `
            <div class="chat-message bot typing-message">
                <div class="chat-message-avatar">🤖</div>
                <div class="chat-message-content">
                    <div class="chat-typing">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', html);
        scrollToBottom();
    }
    
    function hideTypingIndicator() {
        const typing = messagesContainer.querySelector('.typing-message');
        if (typing) typing.remove();
    }
    
    function addUserMessage(text) {
        const html = `
            <div class="chat-message user">
                <div class="chat-message-content">${escapeHtml(text)}</div>
                <div class="chat-message-avatar"><i class="fas fa-user"></i></div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', html);
        scrollToBottom();
    }
    
    function addBotMessage(text) {
        const html = `
            <div class="chat-message bot">
                <div class="chat-message-avatar">🤖</div>
                <div class="chat-message-content">${escapeHtml(text).replace(/\n/g, '<br>')}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', html);
        scrollToBottom();
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function updateLanguage() {
        inputField.placeholder = translations[currentLang].placeholder;
        updateSuggestions();
    }
    
    window.sendChatbotSuggestion = function(suggestion) {
        inputField.value = suggestion;
        sendMessage();
    };
})();
