const s = p => {

    const SCREEN_WIDTH = 600, SCREEN_HEIGHT = 450;
    const IMAGE_DIR = "../images/";

    let shadowAngleOffset = 0.0;
    let shadowAngleMagnitude = 50.0;
    let shadowDir = {x: shadowAngleMagnitude, y: 0.0};
    let graphImg;

    p.preload = () => {
        graphImg = p.loadImage(IMAGE_DIR + 'tree.png');
    }


    p.setup =  ()=>{
        let myCanvas = p.createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
        myCanvas.parent("game-canvas");

        p.drawingContext.shadowOffsetX = shadowDir.x;
        p.drawingContext.shadowOffsetY = shadowDir.y;
        p.drawingContext.shadowBlur = 10;
        p.drawingContext.shadowColor = p.color('rgb(0, 0, 0)'); //'black';

        graphImg.resize(graphImg.width / 4, graphImg.height / 4);
    }


    p.draw = ()=>{
        shadowAngleOffset = (shadowAngleOffset % 360) + (p.deltaTime / 25);

        shadowDir.x = shadowAngleMagnitude * p.cos(p.radians(shadowAngleOffset))
        shadowDir.y = shadowAngleMagnitude * p.sin(p.radians(shadowAngleOffset))
        
        p.drawingContext.shadowOffsetX = shadowDir.x;
        p.drawingContext.shadowOffsetY = shadowDir.y;


        p.background(200);


        p.stroke(5)
        p.fill(255, 0, 0)
        p.line(0, 0, p.mouseX, p.mouseY);
        p.line(SCREEN_WIDTH, 0, p.mouseX, p.mouseY);
        p.line(0, SCREEN_HEIGHT, p.mouseX, p.mouseY);
        p.line(SCREEN_WIDTH, SCREEN_HEIGHT, p.mouseX, p.mouseY);



        if (p.mouseIsPressed && p.mouseButton === p.LEFT) p.fill(0)
        else p.fill(255)

        p.noStroke()
        p.ellipse(p.mouseX, p.mouseY, 80, 80);


        p.image(graphImg, SCREEN_WIDTH / 2 - graphImg.width / 2, SCREEN_HEIGHT - graphImg.height + 10)
    }
}

new p5(s);