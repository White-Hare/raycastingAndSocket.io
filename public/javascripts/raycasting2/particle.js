class Particle {

    constructor(walls, pos) {
        this.pos = pos;
        this.rays = [];

        for (const wall of walls) {
            this.rays.push(new Ray(pos, wall.a));
            this.rays.push(new Ray(pos, wall.b));
        }

        this.sortRaysByAngle();
    }



    sortRaysByAngle() {
        for (let i = 0; i < this.rays.length; i++){
            for (let j = i + 1; i < this.rays.length; j++) {
                let r1 = this.rays[i];
                let r2 = this.rays[j];
                
                if(!r1 || !r2) break;

                let angle1 = atan2(r1.endPos.y - this.pos.y,
                    r1.endPos.x - this.pos.x);
                let angle2 = atan2(r2.endPos.y - this.pos.y,
                    r2.endPos.x - this.pos.x);

                angle1 = degrees(angle1) % 360;
                angle2 = degrees(angle2) % 360;
                

                if (angle1 > angle2) {
                    let temp = this.rays[i];
                    this.rays[i] = this.rays[j];
                    this.rays[j] = temp;
                }
            }
        }


        for (let i = 0; i < this.rays.length; i++){
            this.rays[i].id = i;
        }
    }
}