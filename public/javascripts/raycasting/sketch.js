const gameSocket = io('/game');
const SCREEN_WIDTH = 640,
    SCREEN_HEIGHT = 480;



let walls = [];
let rays = [];
let player;


function setup() {
    let myCanvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    myCanvas.parent("game-canvas");


    walls.push(new Boundary(300, 100, 50, 300));
    walls.push(new Boundary(300, 400, 50, 300));
    walls.push(new Boundary(300, 400, 600, 300));


    walls.push(new Boundary(200, 200, 200, 300));
    walls.push(new Boundary(200, 300, 300, 300));
    walls.push(new Boundary(300, 300, 300, 200));
    walls.push(new Boundary(300, 200, 200, 200));


    walls.push(new Boundary(10, 10, 10, SCREEN_HEIGHT - 10));
    walls.push(new Boundary(10, SCREEN_HEIGHT - 10, SCREEN_WIDTH - 10, SCREEN_HEIGHT - 10));
    walls.push(new Boundary(SCREEN_WIDTH - 10, SCREEN_HEIGHT - 10, SCREEN_WIDTH - 10, 10));
    walls.push(new Boundary(SCREEN_WIDTH - 10, 10, 10, 10));


    player = createVector(50, 150)

    for (let a = 0; a < 360; a += 3) {
        let ray = new Ray(player, a);
        rays.push(ray);

    }
}

function draw() {
    background(0);
    stroke(255);


    let illumatedWalls = [];

    for (const ray of rays) {
        //ray.lookAt(mouseX, mouseY);
        let closestPt = null;
        let closestWall = null;

        for (const wall of walls) {
            let currentPt = ray.cast(wall);

            if (currentPt != null) {
                if (closestPt == null || ray.pos.dist(currentPt) < ray.pos.dist(closestPt)) {
                    closestPt = currentPt;
                    closestWall = wall;
                }
            }
        }

        ray.pt = closestPt;
        if (closestWall && illumatedWalls.find(wall => wall.equals(closestWall)) == undefined)
            illumatedWalls.push(closestWall);


        ray.show();
    }


    stroke(100, 255, 255);
    for (const wall of illumatedWalls) //show visible    //wall of walls|  show all
    {
        wall.show();
    }
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
    player.x = args.x;
    player.y = args.y;
});