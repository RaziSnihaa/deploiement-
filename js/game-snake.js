// ===================================
// 🎮 MINI JEU SNAKE - EASTER EGG
// Jeu caché dans le portfolio
// ===================================

class SnakeGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = 20;
        this.canvas.width = this.gridSize * this.tileCount;
        this.canvas.height = this.gridSize * this.tileCount;
        
        this.snake = [{ x: 10, y: 10 }];
        this.food = { x: 15, y: 15 };
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.gameLoop = null;
        this.gameRunning = false;
        
        this.setupControls();
    }
    
    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch(e.key) {
                case 'ArrowUp':
                case 'z':
                case 'w':
                    if (this.dy === 0) {
                        this.dx = 0;
                        this.dy = -1;
                    }
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                case 's':
                    if (this.dy === 0) {
                        this.dx = 0;
                        this.dy = 1;
                    }
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                case 'q':
                case 'a':
                    if (this.dx === 0) {
                        this.dx = -1;
                        this.dy = 0;
                    }
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                case 'd':
                    if (this.dx === 0) {
                        this.dx = 1;
                        this.dy = 0;
                    }
                    e.preventDefault();
                    break;
            }
        });
    }
    
    start() {
        this.snake = [{ x: 10, y: 10 }];
        this.food = this.generateFood();
        this.dx = 1;
        this.dy = 0;
        this.score = 0;
        this.gameRunning = true;
        this.updateScore();
        
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        
        this.gameLoop = setInterval(() => this.update(), 100);
    }
    
    stop() {
        this.gameRunning = false;
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // Nouvelle position de la tête
        const head = {
            x: this.snake[0].x + this.dx,
            y: this.snake[0].y + this.dy
        };
        
        // Vérifier les collisions avec les murs
        if (head.x < 0 || head.x >= this.tileCount || 
            head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Vérifier les collisions avec le corps
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        // Ajouter la nouvelle tête
        this.snake.unshift(head);
        
        // Vérifier si la nourriture est mangée
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
        
        this.draw();
    }
    
    draw() {
        // Effacer le canvas
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner la grille
        this.ctx.strokeStyle = '#2a2a2a';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
        
        // Dessiner le serpent
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Tête du serpent (blanc)
                this.ctx.fillStyle = '#ffffff';
            } else {
                // Corps du serpent (gradient gris)
                const opacity = 1 - (index / this.snake.length) * 0.5;
                this.ctx.fillStyle = `rgba(200, 200, 200, ${opacity})`;
            }
            
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
            
            // Bordure
            this.ctx.strokeStyle = index === 0 ? '#ffffff' : '#9a9a9a';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
        
        // Dessiner la nourriture
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
        
        // Animation de pulsation pour la nourriture
        const time = Date.now() / 200;
        const pulseSize = Math.sin(time) * 2 + (this.gridSize / 2 - 2);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            pulseSize,
            0,
            Math.PI * 2
        );
        this.ctx.stroke();
    }
    
    generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => 
            segment.x === newFood.x && segment.y === newFood.y
        ));
        return newFood;
    }
    
    updateScore() {
        const scoreElement = document.getElementById('game-score');
        if (scoreElement) {
            scoreElement.textContent = `Score: ${this.score}`;
        }
    }
    
    gameOver() {
        this.stop();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 40px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
        
        this.ctx.font = '20px Inter, sans-serif';
        this.ctx.fillText(`Score Final: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
        
        this.ctx.font = '16px Inter, sans-serif';
        this.ctx.fillStyle = '#9a9a9a';
        this.ctx.fillText('Cliquez sur Démarrer pour rejouer', this.canvas.width / 2, this.canvas.height / 2 + 50);
    }
}

// ===================================
// GESTION DU MODAL ET EASTER EGG
// ===================================

let snakeGame = null;

function initGameEasterEgg() {
    // Créer le bouton caché
    const secretBtn = document.createElement('button');
    secretBtn.className = 'secret-game-trigger';
    secretBtn.innerHTML = '<i class="fas fa-gamepad"></i>';
    secretBtn.title = 'Easter Egg - Cliquez pour jouer !';
    document.body.appendChild(secretBtn);
    
    // Créer le modal du jeu
    const gameModal = document.createElement('div');
    gameModal.className = 'game-modal';
    gameModal.id = 'game-modal';
    gameModal.innerHTML = `
        <div class="game-container">
            <button class="game-close" id="close-game">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="game-title">🐍 Snake Game</h2>
            <p class="game-score" id="game-score">Score: 0</p>
            <canvas id="snake-canvas"></canvas>
            <button class="game-start-btn" id="start-game">
                <i class="fas fa-play"></i> Démarrer
            </button>
            <p class="game-controls">
                🎮 Utilisez les flèches ou ZQSD pour jouer<br>
                🎯 Mangez les points blancs pour grandir !
            </p>
        </div>
    `;
    document.body.appendChild(gameModal);
    
    // Initialiser le jeu
    snakeGame = new SnakeGame('snake-canvas');
    
    // Event listeners
    secretBtn.addEventListener('click', () => {
        gameModal.classList.add('active');
        if (!snakeGame.gameRunning) {
            snakeGame.draw(); // Afficher l'état initial
        }
    });
    
    document.getElementById('close-game').addEventListener('click', () => {
        gameModal.classList.remove('active');
        snakeGame.stop();
    });
    
    document.getElementById('start-game').addEventListener('click', () => {
        snakeGame.start();
    });
    
    // Fermer avec Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameModal.classList.contains('active')) {
            gameModal.classList.remove('active');
            snakeGame.stop();
        }
    });
    
    // Fermer en cliquant en dehors
    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            gameModal.classList.remove('active');
            snakeGame.stop();
        }
    });
    
    console.log('🎮 Easter Egg activé ! Cliquez sur le bouton en bas à gauche pour jouer !');
}

// ===================================
// INITIALISATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Attendre un peu pour s'assurer que tout est chargé
    setTimeout(() => {
        initGameEasterEgg();
    }, 1000);
});

// ===================================
// BONUS: KONAMI CODE
// ===================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            konamiIndex = 0;
            activateKonamiEasterEgg();
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonamiEasterEgg() {
    // Activer un effet spécial
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Afficher un message
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        font-size: 2rem;
        font-weight: bold;
        z-index: 99999;
        text-align: center;
        border: 3px solid white;
    `;
    msg.textContent = '🎉 KONAMI CODE ACTIVÉ ! 🎉';
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.remove();
        document.body.style.animation = '';
    }, 3000);
}
