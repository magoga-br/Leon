const socket = io("https://omnisite.vercel.app/A/chat/website/chat.html");
let username;

socket.on('connect', () => {
    username = `User${Math.floor(Math.random() * 1000)}`;
});

socket.on('message', (data) => {
    const messages = document.getElementById('messages');
    const messageDiv = document.createElement('div');

    messageDiv.classList.add('message');
    if (data.isSystem) {
        messageDiv.classList.add('system');
        messageDiv.innerHTML = data.text;
    } else {
        messageDiv.classList.add(data.username === username ? 'sent' : 'received');
        messageDiv.innerHTML = `
            <div class="username">${data.username}</div>
            <div class="text">${data.text}</div>
            <span class="timestamp">${data.timestamp}</span>
        `;
    }

    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
});

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (message) {
        socket.emit('message', message);
        input.value = '';
    }
}

// Enviar mensagem com Enter
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});