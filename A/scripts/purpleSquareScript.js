const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameRunning = false;
let score = 0;
let square = {
    x: 230, // pos x inicial
    y: 69, // pos y inicial
    width: 40, // largura inicial
    height: 40, // altura inicial
    speed: 5, // velocidade inicial
};
let keys = {};

// Definir salas com conexões
const salas = [
    // Sala 0 (Inicial)
    {
        walls: [
            // Paredes com aberturas nas direções das saídas
            { x: 0, y: 0, width: 50, height: 150 }, // Parede esquerda (topo)
            { x: 0, y: canvas.height - 150, width: 50, height: 150 }, // Parede esquerda (base)
            { x: canvas.width - 50, y: 0, width: 50, height: 150 }, // Parede direita (topo)
            { x: canvas.width - 50, y: canvas.height - 150, width: 50, height: 150 }, // Parede direita (base)
            { x: 0, y: 0, width: 150, height: 50 }, // Parede superior (esquerda)
            { x: canvas.width - 150, y: 0, width: 150, height: 50 }, // Parede superior (direita)
            { x: 0, y: canvas.height - 50, width: 150, height: 50 }, // Parede inferior (esquerda)
            { x: canvas.width - 150, y: canvas.height - 50, width: 150, height: 50 }, // Parede inferior (direita)
        ],
        itens: [
            { x: 100, y: 100, width: 20, height: 20, color: 'red', collected: false },
        ],
        left: null, // Nenhuma sala à esquerda
        right: 1, // Sala 1 à direita
        up: 2, // Sala 2 acima
        down: 3, // Sala 3 abaixo
    },
    // Sala 1 (Direita da Inicial)
    {
        walls: [
            { x: 0, y: 0, width: 50, height: 150 }, // Parede esquerda (topo)
            { x: 0, y: canvas.height - 150, width: 50, height: 150 }, // Parede esquerda (base)
            // Outras paredes...
        ],
        itens: [
            { x: 300, y: 300, width: 20, height: 20, color: 'blue', collected: false },
        ],
        left: 0, // Volta para Sala 0
        right: null, // Nenhuma sala à direita
        up: 4, // Sala 4 acima
        down: 5, // Sala 5 abaixo
    },
    // Sala 2 (Acima da Inicial)
    {
        walls: [
            // Paredes...
        ],
        itens: [
            { x: 200, y: 200, width: 20, height: 20, color: 'green', collected: false },
        ],
        left: 6, // Sala 6 à esquerda
        right: 7, // Sala 7 à direita
        up: null, // Nenhuma sala acima
        down: 0, // Volta para Sala 0
    },
    // Sala 3 (Abaixo da Inicial)
    {
        walls: [
            // Paredes...
        ],
        itens: [
            { x: 400, y: 400, width: 20, height: 20, color: 'yellow', collected: false },
        ],
        left: 8, // Sala 8 à esquerda
        right: 9, // Sala 9 à direita
        up: 0, // Volta para Sala 0
        down: null, // Nenhuma sala abaixo
    },
    // Adicione mais salas conforme necessário...
];

let salaAtual = 0; // Índice da sala atual
let walls = salas[salaAtual].walls; // Paredes da sala atual
let itens = salas[salaAtual].itens; // Itens da sala atual

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
    if (savedTheme === 'dark') {
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
    document.getElementById("mobileControls").classList.add("visible");
    // Focar no canvas automaticamente
    canvas.focus();

    gameLoop();
}

function verificarTransicao() {
    const limiteEsquerdo = 0;
    const limiteSuperior = 0;
    const limiteDireito = canvas.width;
    const limiteInferior = canvas.height;

    // Verificar transições
    if (square.x < limiteEsquerdo) {
        const target = salas[salaAtual].left;
        if (target !== null && target !== undefined) {
            carregarSala(target);
            square.x = limiteDireito - square.width; // Aparece à direita
        }
    } else if (square.x + square.width > limiteDireito) {
        const target = salas[salaAtual].right;
        if (target !== null && target !== undefined) {
            carregarSala(target);
            square.x = limiteEsquerdo; // Aparece à esquerda
        }
    }

    if (square.y < limiteSuperior) {
        const target = salas[salaAtual].up;
        if (target !== null && target !== undefined) {
            carregarSala(target);
            square.y = limiteInferior - square.height; // Aparece abaixo
        }
    } else if (square.y + square.height > limiteInferior) {
        const target = salas[salaAtual].down;
        if (target !== null && target !== undefined) {
            carregarSala(target);
            square.y = limiteSuperior; // Aparece acima
        }
    }
}

function carregarSala(novaSala) {
    if (novaSala >= 0 && novaSala < salas.length) {
        salaAtual = novaSala;
        walls = salas[salaAtual].walls;
        itens = salas[salaAtual].itens;
    }
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Verificar transição entre salas
    verificarTransicao();

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

    // Verificar colisão com itens
    for (let item of itens) {
        if (!item.collected &&
            square.x < item.x + item.width &&
            square.x + square.width > item.x &&
            square.y < item.y + item.height &&
            square.y + square.height > item.y) {
            item.collected = true;
            score += 10;
            document.getElementById('result').textContent = String(score).padStart(4, '0');
        }
    }

    drawWalls();
    drawItems();
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

// Função para desenhar os itens
function drawItems() {
    itens.forEach(item => {
        if (!item.collected) {
            ctx.fillStyle = item.color;
            ctx.fillRect(item.x, item.y, item.width, item.height);
        }
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
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
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