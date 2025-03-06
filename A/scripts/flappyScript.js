var birdImg = new Image();
birdImg.onload = function() {
console.log("Imagem carregada com sucesso!");
};
birdImg.src = '/A/img/square.svg';
var myGamePiece;
var myObstacles = [];
var myScore;
var obstaclesPassed = 0;
// Verifica a preferência do tema no localStorage ao carregar a página
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        document.getElementById("change").textContent = "Change to White Mode";
    }

    function change() {
        // Alterna entre os temas
        const isDarkMode = body.classList.toggle('dark-mode');
        
        // Atualiza o texto do botão
        document.getElementById("change").textContent = isDarkMode ? "Change to White Mode" : "Change to Dark Mode";

        // Salva a preferência no localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

function recarregarAPagina() {
    window.location.reload();
}

function startGame() {
    myGamePiece = new component(30, 30, birdImg, 225, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("20px", "Monocraft", "black", 300, 30, "text");
    
    myGameArea.start();

    document.getElementById("gameCanvas").style.display = "block";
    document.getElementById("menu").style.display = "block";
    document.getElementById("buttons").style.justifyContent = "space-between";
    document.getElementById("p").style.display = "flex";
    document.getElementById("txt").style.display = "none";
    document.getElementById("play").style.display = "none";
    document.getElementById("btngames").style.display = "none";
    document.getElementById("hr").style.display = "none";
    document.addEventListener("keydown", controlGame);
    document.addEventListener("keyup", stopGame);
    document.getElementById("square").style.display = "none";
    document.getElementById("botoes").style.flexDirection = "row";
    // faz o botao up aparecer para dispositivos movéis
    document.getElementById("up").classList.add("visible");
}

function restart() {
    myObstacles = [];
    myGameArea.frameNo = 0;
    obstaclesPassed = 0;
    document.getElementById("restart").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("points").style.display = "none";
    startGame();
}

var myGameArea = {
    canvas : document.getElementById("gameCanvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.image = color instanceof Image ? color : null; // Adaptação para aceitar imagem

    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (this.image) { // Caso tenha imagem
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else { // Caso sem imagem
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitTop(); // Verifica o teto
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.hitTop = function() {
        var rocktop = 0; // Teto da tela
        if (this.y < rocktop) {
            this.y = rocktop;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

// Função que atualiza a área do jogo
function updateGameArea() {
    // Limpa a área do jogo
    myGameArea.clear();
    // Incrementa o número de frames
    myGameArea.frameNo += 1;

    // A cada 150 frames, cria novos obstáculos
    if (myGameArea.frameNo % 150 === 0) {
        const x = myGameArea.canvas.width;
        const height = Math.random() * 100 + (obstaclesPassed/2 >= 10 ? 50 : 60);
        const gap = Math.random() * 100 + (obstaclesPassed/2 >= 10 ? 50 : 60);
        // Adiciona dois novos obstáculos, um em cima e outro embaixo com um espaço entre eles
        myObstacles.push(new component(40, height, "green", x, 0));
        myObstacles.push(new component(40, 270 - height - gap, "green", x, height + gap));
    }

    // Atualiza a posição dos obstáculos
    myObstacles.forEach((obstacle, index) => {
        obstacle.x -= 1;

        // Verifica se o obstáculo foi ultrapassado pelo jogador
        if (!obstacle.passed && obstacle.x + obstacle.width < myGamePiece.x) {
            obstacle.passed = true; 
            obstaclesPassed++;    
        }

        // Remove obstáculos que saíram da tela
        if (obstacle.x + obstacle.width < 0) {
            myObstacles.splice(index, 1);
        }

        // Atualiza o obstáculo
        obstacle.update();
    });

    // Verifica colisão entre o jogador e os obstáculos
    if (myObstacles.some(obs => myGamePiece.crashWith(obs))) {
        // Para o jogo se houver colisão
        clearInterval(myGameArea.interval);
        // Atualiza a pontuação final
        document.getElementById("result").textContent = obstaclesPassed/2;
        // Exibe os botões de reiniciar e menu
        document.getElementById("restart").style.display = "flex";
        document.getElementById("menu").style.display = "block";
        document.getElementById("points").style.display = "flex";
        // o quadrado do jogador continua
        myGamePiece.update();
        return;
    }

    // Atualiza a posição do jogador
    myGamePiece.newPos();
    // Atualiza a exibição do jogador
    myGamePiece.update();
    // Atualiza a pontuação na tela
    myScore.text = "SCORE: " + Math.floor(obstaclesPassed / 2);
    myScore.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}

function controlGame(e) {
    if (e.key === " " || e.key === "ArrowUp" || e.key === "w") {
        if (document.getElementById("restart").style.display === "flex") {
            restart();
        } else {
            accelerate(-0.4);
        }
    }
}

function stopGame(e) {
    if (e.key === " " || e.key === "ArrowUp" || e.key === "w") {
        accelerate(0.20);
    }
}