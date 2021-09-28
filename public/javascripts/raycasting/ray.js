class Ray {
    constructor(pos, angle = 0) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(radians(angle));
        this.pt = null;
    }

    show() {
        push();


        if (this.pt) {
            line(this.pos.x, this.pos.y, this.pt.x, this.pt.y);
        } else {
            translate(this.pos.x, this.pos.y)
            line(0, 0, this.dir.x * 3000, this.dir.y * 3000);
        }
        pop()
    }


    setPosition(x, y) {
        if (this.pt) {
            this.pt.x = this.pt.x + (x - this.pos.x);
            this.pt.y = this.pt.y + (y - this.pos.y);
        }

        this.pos.x = x;
        this.pos.y = y;
    }

    lookAt(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    rotate(a) {
        let d = this.dir;
        let ca = atan(d.y, d.x);

        this.dir.x = cos(ca + radians(a));
        this.dir.y = sin(ca + radians(a));
    }

    cast(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0)
            this.pt = null;


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