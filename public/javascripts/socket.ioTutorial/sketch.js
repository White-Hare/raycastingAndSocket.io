const gameSocket = io('/game');
const SCREEN_WIDTH = 640,
    SCREEN_HEIGHT = 480;


let player = {x: 0, y: 0};
let player2 = {x: 0, y: 0};

let playerRadius = 50;

function setup() {
    let myCanvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    myCanvas.parent("game-canvas");


    ellipseMode(CENTER);
}

function draw() {
    background(0);



    ellipse(player.x, player.y, playerRadius, playerRadius);
    ellipse(player2.x, player2.y, playerRadius, playerRadius);

}


function mouseMoved() {
    player.x = mouseX;
    player.y = mouseY;
    gameSocket.emit('player-move', {
        x: player.x,
        y: player.y
    });
}


gameSocket.on('player-move', args => {
    player2.x = args.x;
    player2.y = args.y;
});