class Zombie extends Player {
    show() {
        map[this.x][this.y].classList.add("zombie");
    }
}