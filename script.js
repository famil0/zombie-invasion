let placeSize = 40;
let col = 20;
let row = 20;
let map = [];
const directions = {
    up: {x: 0, y: -1},
    down: {x: 0, y: 1},
    right: {x: 1, y: 0},
    left: {x: -1, y: 0},
}

const entityType = {
    player: "player",
    zombie: "zombie"
}
let flashlightIsOn = false;
let flashlightPlaces = [];

/**@type{HTMLDivElement}*/
let mapContainer = document.querySelector(".map-container");
let root = document.querySelector(":root");

document.body.addEventListener("keydown", keyPress);

let player = new Player({x: 10, y: 10}, directions.up, entityType.player);
let zombie = new Zombie({x: Math.floor(col * Math.random()), y: Math.floor(row * Math.random())}, directions.up, entityType.zombie);
let zombies = [zombie];

main();


function main() {
    mapContainer.style.setProperty("--row", row);
    root.style.setProperty("--size", placeSize + "px");
    
    
    newMap();
    player.show();
    zombie.show();
}

function newMap() {
    for (let x = 0; x < col; x++) {
        let arr = [];
        for (let y = 0; y < row; y++) {
            let d = document.createElement("div");
            d.classList.add("place");
            arr.push(d);
            mapContainer.appendChild(d);
        }
        map.push(arr);
    }
}

function keyPress(e) {
    if (e.key == 'w' && player.y > 0) {
        player.move(directions.up);
        flashlight();
    }
    else if (e.key == 's' && player.y < row - 1) {
        player.move(directions.down);
        flashlight();
    }
    else if (e.key == 'a' && player.x > 0) {
        player.move(directions.left);
        flashlight();
    }
    else if (e.key == 'd' && player.x < col - 1) {
        player.move(directions.right);
        flashlight();
    }

    if (e.key == 'i') {
        player.rotate(directions.up);
        flashlight(); 
    }
    else if (e.key == 'k') {
        player.rotate(directions.down);
        flashlight(); 
    }
    else if (e.key == 'l') {
        player.rotate(directions.right);
        flashlight(); 
    }
    else if (e.key == 'j') {
        player.rotate(directions.left);
        flashlight(); 
    }

    if (e.key == "f") {        
        flashlightIsOn = !flashlightIsOn;
        flashlight();        
    }

    if (e.key == " ") {
        player.hit(10, zombies.find(z => z.div == map[player.x + player.heading.x][player.y + player.heading.y].children[0]));
    }
}

function removeFlashlights() {
    flashlightPlaces.forEach(p => {
        p.classList.remove("flashlight");
    });
    flashlightPlaces = [];
}

function flashlight() {
    removeFlashlights();
    let n = 10;
    if (flashlightIsOn) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i * 2 + 1; j++) {
                try {
                    if (player.heading == directions.up) {
                        let p = map[player.x + j - i][player.y - i - 1];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    else if (player.heading == directions.down) {
                        let p = map[player.x + j - i][player.y + i + 1];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    else if (player.heading == directions.right) {
                        let p = map[player.x + i + 1][player.y + j - i];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    else if (player.heading == directions.left) {
                        let p = map[player.x - i - 1][player.y + j - i];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                } catch{}
            }
        }       
    }
}