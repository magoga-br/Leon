const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'website')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'chat.html'));
});
const users = {};

io.on('connection', (socket) => {
  // Gerar nome de usuário aleatório
  const username = `User${Math.floor(Math.random() * 1000)}`;
  users[socket.id] = username;
  
  // Notificar todos sobre o novo usuário
  socket.broadcast.emit('message', {
    username: 'Sistema',
    text: `${username} entrou no chat`,
    isSystem: true
  });

  // Lidar com mensagens
  socket.on('message', (message) => {
    io.emit('message', {
      username: users[socket.id],
      text: message,
      timestamp: new Date().toLocaleTimeString()
    });
  });

  // Lidar com desconexão
  socket.on('disconnect', () => {
    io.emit('message', {
      username: 'Sistema',
      text: `${users[socket.id]} saiu do chat`,
      isSystem: true
    });
    delete users[socket.id];
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});