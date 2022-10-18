class Player {
    constructor(x, y, heading) {
        this.x = x;
        this.y = y;
        this.heading = heading;
    }

    show() {
        map[this.x][this.y].classList.add("player");
    }
    
    move(dir) {
        map[this.x][this.y].classList.remove("player");
        this.x += dir.x;
        this.y += dir.y;
        map[this.x][this.y].classList.toggle("player");
    }
}