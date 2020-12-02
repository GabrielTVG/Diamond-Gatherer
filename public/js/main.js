// //ex 1
// const arr1 = ["Love", "I", "Javascript"];
// arr1.splice(1, 1);
// arr1.unshift("I");
// console.log(arr1);
// //ex 2
// const array2 = ["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ];
// array2.forEach(function(item, index){
//     console.log(`Pozitia: ${index},  Valoare:  ${item},  Tipul:  ${typeof item}`)});

// //ex 6
// import { Masina } from '/js/masina.js';
// const masina1 = new Masina('Dacia','1310','1988','fata',true);
// masina1.getMasina();
// masina1.getTipTractiune();
// masina1.getPorneste();
// const masina2 = new Masina('Audi','A3','2003','fata',true);
// masina2.getMasina();
// masina2.getTipTractiune();
// masina2.getPorneste();

// const masina3 = new Masina('Bmw','E36','1997','spate',false);
// masina3.getMasina();
// masina3.getTipTractiune();
// masina3.getPorneste();

//jocul
const canvas = document.getElementById("canvasId");
const context = canvas.getContext('2d');

// const CANVAS_WIDTH = 600;
// const CANVAS_HEIGHT = 400;

// const geoerge = new Image();
// geoerge.src = 'assets/george.png'
// const GEORGE_WIDTH = 40;
// const GEORGE_HEIGHT = 45;
// let georgeX = 100;
// let georgeY = 100;
// geoerge.onload = () => {
//     context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, 100, 100, GEORGE_WIDTH, GEORGE_HEIGHT)
// }


// const mario = new Image();
// mario.src = 'assets/mario.png'
// const MARIO_WIDTH = 32;
// const MARIO_HEIGHT = 39;
// let marioX = 0;
// let marioY = 0;
// mario.onload = () => {
//     context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT)
// }


// const button = document.getElementById("myButton");
// button.addEventListener("click", function() {
//     console.log(this);
//     context.fillStyle = "green";
//     context.fillRect(480, 20, 40, 20);
// });


// document.addEventListener("keydown", function(event) {
//     context.clearRect(0, 0, CANVAS_WIDTH , CANVAS_HEIGHT);
//     switch (event.key) {
//         case 'ArrowUp':
//             {
//                 georgeY -= 10;
//                 break;
//             }
//         case 'ArrowDown':
//             {
//                 georgeY += 10;
//                 break;
//             }
//         case 'ArrowLeft':
//             {
//                 georgeX -= 10;
//                 break;
//             }
//         case 'ArrowRight':
//             {
//                 georgeX += 10;
//                 break;
//             }
//         case 'a':
//             {
//                 marioX -= 10;
//                 break;
//             }
//         case 'd':
//             {
//                 marioX += 10;
//                 break;
//             }
//         case 'w':
//             {
//                 marioY -= 10;
//                 break;
//             }
//         case 's':
//             {
//                 marioY += 10;
//                 break;
//             }
//     }


//     if (georgeX < 0) {
//         georgeX = 0;
//     } else if (georgeX > (CANVAS_WIDTH - GEORGE_WIDTH)) {
//         georgeX = CANVAS_WIDTH - GEORGE_WIDTH;
//     }

//     if (georgeY < 0) {
//         georgeY = 0;
//     } else if (georgeY > (CANVAS_HEIGHT - GEORGE_HEIGHT)) {
//         georgeY = CANVAS_HEIGHT - GEORGE_HEIGHT;
//     }

//     if (marioX < 0) {
//         marioX = 0;
//     } else if (marioX > (CANVAS_WIDTH - MARIO_WIDTH)) {
//         marioX = CANVAS_WIDTH - MARIO_WIDTH;
//     }

//     if (marioY < 0) {
//         marioY = 0;
//     } else if (marioY > (CANVAS_HEIGHT - MARIO_HEIGHT)) {
//         marioY = CANVAS_HEIGHT - MARIO_HEIGHT;
//     }

//     context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT);
//     context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT)
// })

const socket = io();

document.getElementById('join-chat-button').addEventListener('click', function() {
    const input = document.getElementById('user-name-input');
    const userName = input.value;
    if (userName.length > 0) {
        document.getElementById('user-name-missing').classList.add('display-none');
        socket.emit('join-chat', userName);
    } else {
        document.getElementById('user-name-missing').classList.remove('display-none');
    }
})

socket.on('joined-chat', function() {
    console.log('You joined chat!');
    document.getElementById('join-chat').classList.add('display-none');
    document.getElementById('chat-container').classList.remove('display-none');
})

socket.on('new-user-connected', function(username) {
    const messageContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `${username} joined chat!`;
    messageContainer.appendChild(messageElement);
})

document.getElementById('send-message-button').addEventListener('click', function() {
    const input = document.getElementById('message');
    const message = input.value;
    socket.emit('send-message', message);
})

socket.on('new-message', function(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = message;
    messagesContainer.appendChild(messageElement);
})

document.getElementById('leave-chat-button').addEventListener('click', function () {
    socket.emit('leave-chat');
})

socket.on('user-disconnected', function(username) {
    const messageContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `${username} left chat!`;
    messageContainer.appendChild(messageElement);
})

socket.on('menu', function() {
    console.log('You left chat!');
    document.getElementById('join-chat').classList.remove('display-none');
    document.getElementById('chat-container').classList.add('display-none');
})

document.getElementById('create-game-button').addEventListener('click', function() {
    const input = document.getElementById('game-name-input');
    const gameName = input.value;
    if (gameName.length > 0) {
        document.getElementById('game-name-missing').classList.add('display-none');
        socket.emit('create-game', gameName);
    } else {
        document.getElementById('game-name-missing').classList.remove('display-none');
    }
})

socket.on('user-count', function(userCount){
    document.getElementById('user-count').innerHTML = 'Number of users: ' + userCount;
})

socket.on('game-loop', function(objectsForDraw) {
    document.getElementById('join-chat').classList.add('display-none');
    document.getElementById('create-game-container').classList.add('display-none');
    document.getElementById('game-container').classList.remove('display-none');
    context.drawImage(document.getElementById('map-image'), 0, 0);

    objectsForDraw.forEach(function (objectForDraw) {
        context.drawImage(
            document.getElementById(objectForDraw.imageId),
            ...objectForDraw.drawImageParameters
        )
    })
})