class Entity {
    constructor(pos, heading, type) {
        this.x = pos.x;
        this.y = pos.y;
        this.heading = heading;
        this.type = type;
        this.d = document.createElement("div");
    }

    show() {
        this.d.classList.add(this.type);
        map[this.x][this.y].appendChild(this.d);
    }

    move(dir) {
        if (map[this.x + dir.x][this.y + dir.y].children.length >= 1) {return};
        map[this.x][this.y].removeChild(this.d)
        this.x += dir.x;
        this.y += dir.y;
        map[this.x][this.y].appendChild(this.d);
    }

    rotate(dir) {
        this.heading = dir;
        if (dir == directions.up) {
            this.d.id = "up";
        }
        else if (dir == directions.down) {
            this.d.id = "down";
        }
        else if (dir == directions.right) {
            this.d.id = "right";
        }
        else if (dir == directions.left) {
            this.d.id = "left";
        }
    }
}