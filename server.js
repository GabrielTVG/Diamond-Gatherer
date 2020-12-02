const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const Player = require('./player.js');
const Game = require('./game.js');

http.listen(5000, function () {
    console.log('[SERVER STARTED AT PORT 5000]');
})

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
})

app.get('/about', function (request, response) {
    response.sendFile(__dirname + '/about.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('[SOCKET CONNECTED]' + socket.id);
    socket.emit('user-count', Object.keys(chatUsers).length);

    socket.on('join-chat', function (userName, color) {
        console.log('[USER JOINED CHAT]', socket.id, userName);
        chatUsers[socket.id] = userName;
        messageColors[socket.id] = color;
        socket.join('chat');
        socket.emit('joined-chat');
        io.to('chat').emit('new-user', userName);
        io.to('chat').emit('user-count-update', Object.keys(chatUsers).length);
    })

    socket.on('send-message', function (message) {
        console.log('[USER SENT MESSAGE]', message);
        io.to('chat').emit('new-message', `${chatUsers[socket.id]}: <span style="color:${messageColors[socket.id]}">${message}</span>`);
    })

    socket.on('leave-chat', function () {
        console.log('[USER LEFT CHAT]', socket.id);
        let userName = chatUsers[socket.id];
        delete chatUsers[socket.id];
        delete messageColors[socket.id];
        socket.leave('chat');
        socket.emit('menu');
        io.to('chat').emit('user-left', userName);
        io.to('chat').emit('user-count-update', Object.keys(chatUsers).length);
    })

    socket.on('create-game', function (gameName) {
        console.log('[NEW GAME CREATED]');
        const gameId = 'game-' + socket.id;
        const players = [new Player()];
        const game = new Game({
            id: gameId,
            players: players
        });
        games[gameId] = game;
        console.log('[User joined ' + gameId + '] room');
        socket.join(gameId);
    })
})

function gameLoop(id) {
    const objectsForDraw = [];
    games[id].players.forEach(function (player) {
        objectsForDraw.push(player.forDraw());
    })
    io.to(id).emit('game-loop', objectsForDraw);
}

const chatUsers = {};
const games = {};
const messageColors = {};