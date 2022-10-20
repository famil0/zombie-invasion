class Entity {
    constructor(pos, heading, type) {
        this.x = pos.x;
        this.y = pos.y;
        this.heading = heading;
        this.type = type;
        this.div = document.createElement("div");
        this.health = 100;
        this.canGetHit = true;
        this.n = 0;
        this.div.addEventListener("webkitAnimationEnd", () => { 
            this.canGetHit = true;
            this.div.classList.remove("hit");
            console.log("utana: " + this.canGetHit);
        });
    }

    show() {
        this.div.classList.add(this.type);
        map[this.x][this.y].appendChild(this.div);
    }

    move(dir) {
        if (map[this.x + dir.x][this.y + dir.y].children.length >= 1) {return};
        map[this.x][this.y].removeChild(this.div)
        this.x += dir.x;
        this.y += dir.y;
        map[this.x][this.y].appendChild(this.div);
    }

    rotate(dir) {
        this.heading = dir;
        if (dir == directions.up) {
            this.div.id = "up";
        }
        else if (dir == directions.down) {
            this.div.id = "down";
        }
        else if (dir == directions.right) {
            this.div.id = "right";
        }
        else if (dir == directions.left) {
            this.div.id = "left";
        }
    }

    hit(amount, target) {
        if (target == null || target.canGetHit == false || target.div.classList.contains("hit")) return;
        target.health -= amount;
        // if ()
        target.div.classList.add("hit");
        this.canGetHit = false; 
        if (target.health <= 0) target.die();
    }

    die() {
        this.div.remove();
        this.div = null;        
    }
}