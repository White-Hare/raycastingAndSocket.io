const SCREEN_WIDTH = 640,
    SCREEN_HEIGHT = 480;



let walls = [];
let particle;


function setup() {
    let myCanvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    myCanvas.parent("game-canvas");


    walls.push(new Boundary(300, 100, 50, 300));
    walls.push(new Boundary(300, 400, 50, 300));
    walls.push(new Boundary(300, 400, 600, 300));
    walls.push(new Boundary(600, 300, 300, 100));


    walls.push(new Boundary(200, 200, 200, 300));
    walls.push(new Boundary(200, 300, 300, 300));
    walls.push(new Boundary(300, 300, 300, 200));
    walls.push(new Boundary(300, 200, 200, 200));


    walls.push(new Boundary(500, 200, 500, 300));
    walls.push(new Boundary(500, 300, 400, 300));
    walls.push(new Boundary(400, 300, 400, 200));
    walls.push(new Boundary(400, 200, 500, 200));


    walls.push(new Boundary(10, 10, 10, SCREEN_HEIGHT - 10));
    walls.push(new Boundary(10, SCREEN_HEIGHT - 10, SCREEN_WIDTH - 10, SCREEN_HEIGHT - 10));
    walls.push(new Boundary(SCREEN_WIDTH - 10, SCREEN_HEIGHT - 10, SCREEN_WIDTH - 10, 10));
    walls.push(new Boundary(SCREEN_WIDTH - 10, 10, 10, 10));


    particle = new Particle(walls, createVector(SCREEN_WIDTH, SCREEN_HEIGHT));

    textSize(24);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);


    particle.pos.x = mouseX;
    particle.pos.y = mouseY;

    particle.sortRaysByAngle();


    stroke(200, 0, 0);
    fill(255);

    let illumatedWalls = [];

    for (const ray of particle.rays) {
        let closestPt = null;
        let closestWall = null;

        for (const wall of walls) {
            let currentPt = ray.cast(wall);

            if (currentPt != null) {
                if (currentPt.equals(ray.beginPos) || currentPt.equals(ray.endPos))
                    continue;

                if (closestPt == null || (ray.beginPos.dist(currentPt) < ray.beginPos.dist(closestPt))) {
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

    for (const wall of illumatedWalls) {
        wall.show();
    }


    stroke(10, 200, 10);
    fill(255, 255, 255, 50);


    drawLights(particle.rays);


    fill(255, 0, 0, 50);
    particle.rays.forEach(ray => {
        let pos = ray.pt ? ray.pt : ray.endPos;
        text(ray.id, pos.x, pos.y);
    });
}



function polygon(verticies) {
    beginShape();

    for (let v of verticies)
        vertex(v.x, v.y);


    endShape(CLOSE);
}


function drawLights(rays) {
    let length = particle.rays.length;
    let i = 0;

    while (i < length) {
        let j = (i + 1) % length;


        let p1Ext = rays[i].pt != undefined && !rays[i].pt.equals(rays[i].endPos);
        let p2Ext = rays[j].pt != undefined && !rays[j].pt.equals(rays[j].endPos);

        let v1 = p1Ext ? rays[i].pt : rays[i].endPos;
        let v2 = p2Ext ? rays[j].pt : rays[j].endPos;


        if (v1.equals(v2)) {
            i++
            continue;
        }

        
        let skip = false;
        if (p1Ext && p2Ext) {

            if( !rays[i].isIntersectionPointFurtherThanEndPoint && 
                !rays[j].isIntersectionPointFurtherThanEndPoint) {
                while (p2Ext && isOnSameLine(rays[j-2], rays[j], rays[j+2])) {
                    j = (j + 1) % length;
                    console.log(j);

                    p2Ext = rays[j].pt != undefined && !rays[j].isIntersectionPointFurtherThanEndPoint;
                    v2 = p2Ext ? rays[j].pt : rays[j].endPos;

                    if (j == 0)
                        break;
                }
            }

            else if (rays[i].isIntersectionPointFurtherThanEndPoint)// && rays[i].isIntersectionPointFurtherThanEndPoint)
                v1 = rays[i].endPos;

            else if(rays[j].isIntersectionPointFurtherThanEndPoint)
                v2 = rays[j].endPos;

        }


        if(skip) continue;

        let verticies = [particle.pos, v1, v2];
        polygon(verticies);

        if (j == 0) break;
        i = j;
    }

}


function isOnSameLine(v1, v2, v3){
    if(!v1 || !v2 || !v3 || (v1.x == v2.x || v1.x == v3.x || v2.x == v3.x))
        return false;

    let s1 = (v2.y - v1.y) / (v2.x - v1.x);
    let s2 = (v3.y - v1.y) / (v3.x - v1.x);


    return s1 == s2;
}