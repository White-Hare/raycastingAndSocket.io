const s2 = p => {
    const SCREEN_WIDTH = 600,
        SCREEN_HEIGHT = 450;
    let rectPositions = [{
            x: SCREEN_WIDTH / 2,
            y: SCREEN_HEIGHT / 2,
            angle: 30.0
        },
        {
            x: 50,
            y: 50,
            angle: 50.0
        },
        {
            x: 50,
            y: SCREEN_HEIGHT - 50,
            angle: 150.0
        },
        {
            x: SCREEN_WIDTH - 50,
            y: 50,
            angle: 250.0
        },
        {
            x: SCREEN_WIDTH - 50,
            y: SCREEN_HEIGHT - 50,
            angle: 350.0
        }
    ];

    p.setup = ()=> {
        let myCanvas = p.createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
        myCanvas.parent("game-canvas2");

        p.rectMode(p.CENTER);
    }

    p.draw = ()=> {
        p.background(0);

        for (const rectpos of rectPositions) {
            rectpos.angle = rectpos.angle % 360 + p.deltaTime / 8;
            p.translate(rectpos.x, rectpos.y);
            p.rotate(p.radians(rectpos.angle))
            p.rect(0, 0, 50, 50)

            p.resetMatrix();
        }

        p.translate(180, 180);
        polygon(0, 0, 60, 9);
    }



    function polygon(x, y, radius, npoints) {
        let angle = p.TWO_PI / npoints;
    
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += angle){
            let sx = x + p.cos(a) * radius;
            let sy = y + p.sin(a) * radius;

            p.vertex(sx, sy);
        }
        p.endShape(p.CLOSE);
    }
}

new p5(s2);