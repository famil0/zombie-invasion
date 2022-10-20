class Zombie extends Entity {
    die() {
        super.die();
        if (this.type == entityType.zombie) {
            zombies.splice(this, 1);            
        }
    }
}