const canvas = document.getElementById("canvasSquare");
const context = canvas.getContext('2d');

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const myButton = document.getElementById("randomSquare");

function drawSquare(x, y) {
    context.fillStyle = "green";
    context.fillRect(x, y, 50, 50);
}

function generateSquare() {
    let x = Math.floor(Math.random() * 550);
    let y = Math.floor(Math.random() * 350);

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawSquare(x, y);
}


myButton.addEventListener("click", generateSquare);