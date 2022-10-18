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
// let player = document.createElement("div");
// let player = {
//     x: 0,
//     y: 0
// };
// let heading = {
//     x: 0,
//     y: -1
// };
let flashlightIsOn = false;
let flashlightPlaces = [];

/**@type{HTMLDivElement}*/
let mapContainer = document.querySelector(".map-container");
/**@type{HTMLDivElement}*/
let root = document.querySelector(":root");

document.body.addEventListener("keypress", keyPress);

let player = new Player(10, 10, {x: 0, y: -1});

main();


function main() {
    mapContainer.style.setProperty("--row", row);
    root.style.setProperty("--size", placeSize + "px");

    
    newMap();
    player.show();
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
    // let x = Math.floor(col*Math.random());
    // let y = Math.floor(row*Math.random());
    // map[x][y].classList.add("player");
    // player = {x, y};
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
        root.style.setProperty("--heading", "0deg");
        player.heading = directions.up;
        flashlight(); 
    }
    else if (e.key == 'k') {
        root.style.setProperty("--heading", "180deg");
        player.heading = directions.down
        flashlight(); 
    }
    else if (e.key == 'l') {
        root.style.setProperty("--heading", "90deg");
        player.heading = directions.right;
        flashlight(); 
    }
    else if (e.key == 'j') {
        root.style.setProperty("--heading", "270deg");
        player.heading = directions.left;
        flashlight(); 
    }

    if (e.key == " ") {        
        flashlightIsOn = !flashlightIsOn;
        flashlight();        
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
        if (player.heading.x == 0 && player.heading.y == -1) { //up
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < i * 2 + 1; j++) {
                    try {
                        let p = map[player.x + j - i][player.y - i - 1];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    catch {}
                }
            }
        }
        else if (player.heading.x == 0 && player.heading.y == 1) { //down
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < i * 2 + 1; j++) {
                    try {
                        let p = map[player.x + j - i][player.y + i + 1];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    catch {}
                }
            }
        }
        else if (player.heading.x == 1 && player.heading.y == 0) { //right
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < i * 2 + 1; j++) {
                    try {
                        let p = map[player.x + i + 1][player.y + j - i];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    catch {}
                }
            }
        }
        else if (player.heading.x == -1 && player.heading.y == 0) { //left
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < i * 2 + 1; j++) {
                    try {
                        let p = map[player.x - i - 1][player.y + j - i];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    catch {}
                }
            }
        }        
    }
}