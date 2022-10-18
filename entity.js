class Entity {
    constructor(pos, heading, type) {
        this.x = pos.x;
        this.y = pos.y;
        this.heading = heading;
        this.type = type;
    }

    show() {
        map[this.x][this.y].classList.add(this.type);
    }

    move(dir) {
        map[this.x][this.y].classList.remove(this.type);
        this.x += dir.x;
        this.y += dir.y;
        map[this.x][this.y].classList.toggle(this.type);
    }
}