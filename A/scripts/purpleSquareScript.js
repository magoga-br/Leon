const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameRunning = false;
let square = {
    x: 230, // pos x inicial
    y: 69, // pos y inicial
    width: 40,  // Largura inicial
    height: 40, // Altura inicial
    speed: 5, // Velocidade inicial
};
let keys = {};

// Definir paredes
const walls = [
    // Cantos
    {x: 0, y: 0, width: 150, height: 200}, // Topo Esquerdo
    {x: canvas.width - 150, y: 0, width: 150, height: 150}, // Topo Direito
    {x: 0, y: canvas.height - 150, width: 150, height: 150}, // Baixo Esquerdo
    {x: canvas.width - 150, y: canvas.height - 0, width: 150, height: 0}, // Baixo Direito

    // Paredes Horizontais
    {x: 100, y: 0, width: 0, height: 0}, // Topo
    {x: 100, y: canvas.height - 100, width: 0, height: 0}, // Baixo

    // Paredes Verticais
    {x: 0, y: 100, width: 0, height: 0}, // Esquerda
    {x: canvas.width - 150, y: 250, width: 150, height: 220}, // Direita
];

const itens = [
    // Definir itens
    {x: 100, y: 100, width: 20, height: 20, color: 'red'}
];

// Carregar a imagem
const squareImage = new Image();
squareImage.src = "/A/img/square.svg"; // Substitua pelo caminho da sua imagem

function recarregarAPagina() {
    window.location.reload();
}

// Theme management
function changeTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('change').textContent = isDark ? 'Change to Light Mode' : 'Change to Dark Mode';
}

// Load saved theme
(() => {
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('change').textContent = 'Change to Light Mode';
    }
})();

function startGame() {
    gameRunning = true;
    canvas.style.display = 'flex';
    document.getElementById('play').style.display = 'none';
    document.getElementById('txt').style.display = 'none';
    document.getElementById('square').style.display = 'none';
    document.getElementById('hr').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
    document.getElementById('p').style.display = 'block';
    document.getElementById("btngames").style.display = "none";
    document.getElementById("botoes").style.flexDirection = "row";

    // Focar no canvas automaticamente
    canvas.focus();

    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movimento horizontal (eixo X)
    let newX = square.x;
    if (keys.ArrowLeft || keys.a) newX -= square.speed;
    if (keys.ArrowRight || keys.d) newX += square.speed;

    // Verificar colisão apenas no eixo X
    let collidedX = false;
    for (let wall of walls) {
        if (newX < wall.x + wall.width &&
            newX + square.width > wall.x &&
            square.y < wall.y + wall.height &&
            square.y + square.height > wall.y) {
            collidedX = true;
            break;
        }
    }

    if (!collidedX) {
        square.x = newX;
    }

    // Movimento vertical (eixo Y)
    let newY = square.y;
    if (keys.ArrowUp || keys.w) newY -= square.speed;
    if (keys.ArrowDown || keys.s) newY += square.speed;

    // Verificar colisão apenas no eixo Y
    let collidedY = false;
    for (let wall of walls) {
        if (square.x < wall.x + wall.width &&
            square.x + square.width > wall.x &&
            newY < wall.y + wall.height &&
            newY + square.height > wall.y) {
            collidedY = true;
            break;
        }
    }

    if (!collidedY) {
        square.y = newY;
    }

    drawWalls();
    drawSquare();
    requestAnimationFrame(gameLoop);
}

// Função para desenhar as paredes
function drawWalls() {
    ctx.fillStyle = '#666';
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

// Função para desenhar o quadrado
function drawSquare() {
    ctx.drawImage(squareImage, square.x, square.y, square.width, square.height);
}

// Event listeners para teclas de movimento (apenas com foco no canvas)
canvas.addEventListener('keydown', (e) => {
    e.preventDefault(); // Impedir comportamento padrão do navegador

    keys[e.key.toLowerCase()] = true;
    keys[e.key] = true;

    // Alterar tamanho ao pressionar L, K ou J
    if (e.key === 'j' || e.key === 'J') {
        square.width = 10;
        square.height = 40;
    } else if (e.key === 'l' || e.key === 'L') {
        square.width = 40;
        square.height = 10;
    } else if (e.key === 'k' || e.key === 'K') {
        square.width = 40;
        square.height = 40;
    }

    // Alterar velocidade ao pressionar Shift
    if (e.shiftKey) {
        square.speed = 1; // Velocidade lenta
    }

    if (e.ctrlKey) {
        square.speed = 10; // Velocidade rápida
    }
});

canvas.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    keys[e.key] = false;

    // Restaurar velocidade ao soltar Shift
    if (e.key === 'Shift' || e.key === 'Control') {
        square.speed = 5; // Velocidade normal
    }
});

// Prevent arrow key scrolling
window.addEventListener('keydown', (e) => {
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
});

// Focar no canvas ao clicar nele
canvas.addEventListener('click', () => {
    canvas.focus();
});

// Event listener para prevenir o fechamento da aba com Ctrl + W
canvas.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'w') {
        e.preventDefault(); // Prevenir o comportamento padrão do navegador
        console.log("Ctrl + W pressionado, mas a aba não será fechada.");
    }
});

// Adicionar eventos aos botões de controle móvel (funcionam tanto para toque quanto para clique)
document.getElementById('btnUp').addEventListener('touchstart', () => keys.w = true);
document.getElementById('btnUp').addEventListener('touchend', () => keys.w = false);
document.getElementById('btnUp').addEventListener('mousedown', () => keys.w = true);
document.getElementById('btnUp').addEventListener('mouseup', () => keys.w = false);

document.getElementById('btnDown').addEventListener('touchstart', () => keys.s = true);
document.getElementById('btnDown').addEventListener('touchend', () => keys.s = false);
document.getElementById('btnDown').addEventListener('mousedown', () => keys.s = true);
document.getElementById('btnDown').addEventListener('mouseup', () => keys.s = false);

document.getElementById('btnLeft').addEventListener('touchstart', () => keys.a = true);
document.getElementById('btnLeft').addEventListener('touchend', () => keys.a = false);
document.getElementById('btnLeft').addEventListener('mousedown', () => keys.a = true);
document.getElementById('btnLeft').addEventListener('mouseup', () => keys.a = false);

document.getElementById('btnRight').addEventListener('touchstart', () => keys.d = true);
document.getElementById('btnRight').addEventListener('touchend', () => keys.d = false);
document.getElementById('btnRight').addEventListener('mousedown', () => keys.d = true);
document.getElementById('btnRight').addEventListener('mouseup', () => keys.d = false);

// Botões de transformação (funcionam tanto para toque quanto para clique)
document.getElementById('btnJ').addEventListener('touchstart', () => {
square.width = 10;
square.height = 40;
});
document.getElementById('btnJ').addEventListener('mousedown', () => {
square.width = 10;
square.height = 40;
});

document.getElementById('btnK').addEventListener('touchstart', () => {
square.width = 40;
square.height = 40;
});
document.getElementById('btnK').addEventListener('mousedown', () => {
square.width = 40;
square.height = 40;
});

document.getElementById('btnL').addEventListener('touchstart', () => {
square.width = 40;
square.height = 10;
});
document.getElementById('btnL').addEventListener('mousedown', () => {
square.width = 40;
square.height = 10;
});