
class RedTile {
    static width = 48 // static propriety 
    static height = 48
    constructor({ position }) {
        this.position = position;
        this.width = 12 * 4 // zooming 4 times
        this.height = 12 * 4

        // added by me !
        this.left = this.left;
        this.right = this.right;
        this.top = this.top;
        this.bottom = this.bottom;


    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,0.5)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }




    
    left() {
        return this.position.x
    }


    right() {
        return this.position.x + this.width;
    }

    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y + this.height;
    }

}

// we increased our tiles by 4 times because 
// we exported our file at 400%
