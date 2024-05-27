// Seleziona il contenitore del gioco nel documento HTML
const container = document.querySelector('.container');

// Seleziona l'elemento della pallina nel documento HTML
const ball = document.querySelector('.ball');

// Seleziona il giocatore 1 nel documento HTML
const player1 = document.getElementById('player1');

// Seleziona il giocatore 2 nel documento HTML
const player2 = document.getElementById('player2');

// Seleziona il display del punteggio del giocatore 1 nel documento HTML
const player1ScoreDisplay = document.querySelector('.player1-score');

// Seleziona il display del punteggio del giocatore 2 nel documento HTML
const player2ScoreDisplay = document.querySelector('.player2-score');

// Variabili per la posizione e la velocità della pallina
let ballX = 290;
let ballY = 190;
let ballSpeedX = 2;
let ballSpeedY = 2;

// Variabili per la posizione dei giocatori e i loro punteggi
let player1Y = 160;
let player2Y = 160;
let player1Score = 0;
let player2Score = 0;

// Variabili per impostare il punteggio vincente e i nomi dei giocatori
let winningScore = 5; // Punteggio per vincere
let player1Name = "Player 1"; // Nome predefinito per il giocatore 1
let player2Name = "Player 2"; // Nome predefinito per il giocatore 2

// Variabile per tenere traccia dello stato del gioco
let gameRunning = false;

// Variabili per il movimento dei giocatori
let isPlayer1MovingUp = false;
let isPlayer1MovingDown = false;
let isPlayer2MovingUp = false;
let isPlayer2MovingDown = false;

// Funzione per aggiornare la posizione della pallina
const update = () => {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Collisione con le pareti superiori e inferiori
    if (ballY <= 0 || ballY >= 380) {
        ballSpeedY = -ballSpeedY;
    }

    // Collisione con la racchetta del giocatore 1
    if (ballX <= 30 && ballY >= player1Y && ballY <= player1Y + 80) {
        ballSpeedX = -ballSpeedX;
        ballSpeedX *= 1.1; // Aumenta la velocità in direzione X
        ballSpeedY *= 1.1; // Aumenta la velocità in direzione Y
    }

    // Collisione con la racchetta del giocatore 2
    if (ballX >= 560 && ballY >= player2Y && ballY <= player2Y + 80) {
        ballSpeedX = -ballSpeedX;
        ballSpeedX *= 1.1; // Aumenta la velocità in direzione X
        ballSpeedY *= 1.1; // Aumenta la velocità in direzione Y
    }

    // Controlla se la pallina è uscita dal campo (punto segnato)
    if (ballX <= 0) {
        player2Score++;
        resetBall();
        updateScore();
    } else if (ballX >= 580) {
        player1Score++;
        resetBall();
        updateScore();
    }

    // Aggiorna la posizione della pallina nel documento HTML
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Aggiorna la posizione dei giocatori nel documento HTML
    player1.style.top = player1Y + 'px';
    player2.style.top = player2Y + 'px';
};

// Funzione per ripristinare la posizione della pallina
const resetBall = () => {
    ballX = 290;
    ballY = 190;
    ballSpeedX = player1Score > player2Score ? -2 : 2; // Imposta la direzione in base all'ultimo punto segnato
    ballSpeedY = 2;
};

// Funzione per aggiornare il punteggio dei giocatori nel documento HTML
const updateScore = () => {
    player1ScoreDisplay.textContent = `${player1Name}: ${player1Score}`;
    player2ScoreDisplay.textContent = `${player2Name}: ${player2Score}`;

    // Controlla se uno dei giocatori ha raggiunto il punteggio vincente
    if (player1Score >= winningScore || player2Score >= winningScore) {
        endGame(); // Termina il gioco
    }
};

// Funzione per avviare il gioco
const startGame = () => {
    // Ottiene i nomi dei giocatori e il punteggio vincente dall'input dell'utente
    player1Name = document.getElementById('player1Name').value.trim();
    player2Name = document.getElementById('player2Name').value.trim();
    winningScore = parseInt(document.getElementById('winningScore').value);

    // Controlla se i campi sono stati compilati correttamente
    if (!player1Name || !player2Name || isNaN(winningScore) || winningScore <= 0) {
        alert("Please fill out all fields correctly.\nPlayer names cannot be empty.\nWinning score must be a positive number.");
        return;
    }

    // Nasconde il menu e mostra il campo di gioco
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
gameRunning = true; // Imposta lo stato del gioco su "in esecuzione"
resetGame(); // Resetta il gioco
requestAnimationFrame(gameLoop); // Avvia il loop di gioco
};

// Funzione per terminare il gioco
const endGame = () => {
// Determina il vincitore in base al punteggio
let winner = player1Score > player2Score ? player1Name : player2Name;
alert(`${winner} ha vinto!`); // Mostra un messaggio con il vincitore
resetGame(); // Resetta il gioco
// Mostra nuovamente il menu e nasconde il campo di gioco
document.getElementById('menu').style.display = 'block';
document.getElementById('game').style.display = 'none';
};

// Funzione per ripristinare lo stato iniziale del gioco
const resetGame = () => {
// Resetta i punteggi dei giocatori
player1Score = 0;
player2Score = 0;
// Aggiorna il display del punteggio
updateScore();
// Ripristina la posizione della pallina
resetBall();
};

// Funzione per gestire il movimento delle racchette dei giocatori
const handlePaddleMovement = () => {
// Movimento del giocatore 1
if (isPlayer1MovingUp) {
player1Y -= 5; // Muove verso l'alto
}
if (isPlayer1MovingDown) {
player1Y += 5; // Muove verso il basso
}
// Movimento del giocatore 2
if (isPlayer2MovingUp) {
    player2Y -= 5; // Muove verso l'alto
}
if (isPlayer2MovingDown) {
    player2Y += 5; // Muove verso il basso
}

// Assicura che le racchette restino all'interno del campo di gioco
player1Y = Math.max(0, Math.min(320, player1Y)); // Limita la posizione del giocatore 1
player2Y = Math.max(0, Math.min(320, player2Y)); // Limita la posizione del giocatore 2
};

// Event listener per la pressione dei tasti della tastiera
document.addEventListener('keydown', (event) => {
// Controlla quale tasto è stato premuto e imposta le variabili di movimento dei giocatori
if (event.key === 'w') {
isPlayer1MovingUp = true; // Muove il giocatore 1 verso l'alto
} else if (event.key === 's') {
isPlayer1MovingDown = true; // Muove il giocatore 1 verso il basso
} else if (event.key === 'ArrowUp') {
isPlayer2MovingUp = true; // Muove il giocatore 2 verso l'alto
} else if (event.key === 'ArrowDown') {
isPlayer2MovingDown = true; // Muove il giocatore 2 verso il basso
}
});

// Event listener per il rilascio dei tasti della tastiera
document.addEventListener('keyup', (event) => {
// Controlla quale tasto è stato rilasciato e ferma il movimento corrispondente dei giocatori
if (event.key === 'w') {
isPlayer1MovingUp = false; // Ferma il movimento verso l'alto del giocatore 1
} else if (event.key === 's') {
isPlayer1MovingDown = false; // Ferma il movimento verso il basso del giocatore 1
} else if (event.key === 'ArrowUp') {
isPlayer2MovingUp = false; // Ferma il movimento verso l'alto del giocatore 2
} else if (event.key === 'ArrowDown') {
isPlayer2MovingDown = false; // Ferma il movimento verso il basso del giocatore 2
}
});

// Funzione per il loop di gioco
const gameLoop = () => {
if (gameRunning) {
handlePaddleMovement(); // Gestisce il movimento delle racchette
update(); // Aggiorna la posizione della pallina e il punteggio
requestAnimationFrame(gameLoop); // Esegue nuovamente il loop
}
};

// Event listener per avviare il gioco quando si preme il pulsante "Start"
document.getElementById('startButton').addEventListener('click', () => {
startGame();
});
