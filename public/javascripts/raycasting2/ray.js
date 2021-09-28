let ray_id = 0; 

class Ray {
    constructor(beginPos, endPos) {
        this.beginPos = beginPos;
        this.endPos = endPos;
        this.pt = null;

        this.id = ray_id++;
    }

    show() {
        push();

        if (this.pt) {
            line(this.beginPos.x, this.beginPos.y, this.pt.x, this.pt.y);
        } else {
            let dir = p5.Vector.sub(this.endPos, this.beginPos).normalize();

            translate(this.beginPos.x, this.beginPos.y)
            line(0, 0, dir.x * 3000, dir.y * 3000);
        }
        pop()
    }


    move(x, y) {
        if (this.pt) {
            this.pt.x = this.pt.x + (x - this.beginPos.x);
            this.pt.y = this.pt.y + (y - this.beginPos.y);
        }


        let dir = this.direction * this.magnitude;

        this.beginPos.x = x;
        this.beginPos.y = y;

        this.endPos.x = x + dir.x;
        this.endPos.y = y + dir.y;
    }

    lookAt(x, y) {
        let dir = createVector();

        dir.x = x - this.beginPos.x;
        dir.y = y - this.beginPos.y;
        dir.normalize();

        this.endPos = this.beginPos + dir * this.magnitude;
    }

    rotate(a) {
        let d = this.direction;
        let ca = atan(d.y, d.x);

        let magnitude = this.magnitude;

        this.endPos.x = this.beginPos.x + cos(ca + radians(a)) * magnitude;
        this.endPos.y = this.beginPos.y + sin(ca + radians(a)) * magnitude;
    }

    get magnitude(){
        if(this.pt)
            return this.pt.dist(this.beginPos);

        return this.endPos.dist(this.beginPos);
    }

    get isIntersectionPointFurtherThanEndPoint(){
        return this.pt && this.magnitude > this.endPos.dist(this.beginPos);
    }

    get direction(){
        return this.endPos.copy().sub(this.beginPos).normalize()
    }

    cast(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.beginPos.x;
        const y3 = this.beginPos.y;

        let dir = this.direction;

        const x4 = this.beginPos.x + dir.x;
        const y4 = this.beginPos.y + dir.y;


        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0)
            return null;


        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        if (t < 0 || t > 1) {
            return null;
        }
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (u <= 0) {
            return null;
        }


        let pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);


        return pt;
    }
}