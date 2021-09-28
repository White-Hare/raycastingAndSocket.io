class Boundary{
    constructor(x1, y1, x2, y2){
        this.a = createVector(x1, y1); 
        this.b = createVector(x2, y2); 
    }

    show(){
        let a= this.a, b= this.b;
        line(a.x, a.y, b.x, b.y);
    }


    equals(b2){        
        return this.a.equals(b2.a) && this.b.equals(b2.b);
    }
}