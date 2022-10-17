let placeSize = 40;
let col = 20;
let row = 20;
let map = [];
let playerLocation = {
    x: 0,
    y: 0
};
let heading = {
    x: 0,
    y: -1
};
let flashlightIsOn = false;
let flashlightPlaces = [];

/**@type{HTMLDivElement}*/
let mapContainer = document.querySelector(".map-container");
/**@type{HTMLDivElement}*/
let root = document.querySelector(":root");

document.body.addEventListener("keypress", keyPress);



main();


function main() {
    mapContainer.style.setProperty("--row", row);
    root.style.setProperty("--size", placeSize + "px");
    newMap();
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
    let x = Math.floor(col*Math.random());
    let y = Math.floor(row*Math.random());
    map[x][y].classList.add("player");
    playerLocation = {x, y};
}

function keyPress(e) {
    if (e.key == 'w' && playerLocation.y > 0) {
        move(heading);
    }
    else if (e.key == 's' && playerLocation.y < row - 1) {
        move({ x: -heading.x, y: -heading.y});
    }
    else if (e.key == 'a' && playerLocation.x > 0) {
        move({ x: heading.y, y: -heading.x});
    }
    else if (e.key == 'd' && playerLocation.x < col - 1) {
        move({ x: -heading.y, y: heading.x});
    }

    if (e.key == 'i') {
        root.style.setProperty("--heading", "0deg");
        heading.x = 0;
        heading.y = -1;
        flashlight(); 
    }
    else if (e.key == 'k') {
        root.style.setProperty("--heading", "180deg");
        heading.x = 0;
        heading.y = 1;
        flashlight(); 
    }
    else if (e.key == 'l') {
        root.style.setProperty("--heading", "90deg");
        heading.x = 1;
        heading.y = 0;
        flashlight(); 
    }
    else if (e.key == 'j') {
        root.style.setProperty("--heading", "270deg");
        heading.x = -1;
        heading.y = 0;
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

function move(dir) {
    map[playerLocation.x][playerLocation.y].classList.toggle("player");
    map[playerLocation.x + dir.x][playerLocation.y + dir.y].classList.toggle("player");
    playerLocation.x = playerLocation.x + dir.x;
    playerLocation.y = playerLocation.y + dir.y;
    flashlight();
}

function flashlight() {
    removeFlashlights();
    let n = 10;
    if (flashlightIsOn) {
        if (heading.x == 0 && heading.y == -1) { //up
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < i * 2 + 1; j++) {
                    try {
                        let p = map[playerLocation.x + j - i][playerLocation.y - i - 1];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    catch {}
                }
            }
        }
        else if (heading.x == 0 && heading.y == 1) { //down
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < i * 2 + 1; j++) {
                    try {
                        let p = map[playerLocation.x + j - i][playerLocation.y + i + 1];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    catch {}
                }
            }
        }
        else if (heading.x == 1 && heading.y == 0) { //right
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < i * 2 + 1; j++) {
                    try {
                        let p = map[playerLocation.x + i + 1][playerLocation.y + j - i];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    catch {}
                }
            }
        }
        else if (heading.x == -1 && heading.y == 0) { //left
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < i * 2 + 1; j++) {
                    try {
                        let p = map[playerLocation.x - i - 1][playerLocation.y + j - i];
                        p.classList.add("flashlight");
                        flashlightPlaces.push(p);
                    }
                    catch {}
                }
            }
        }        
    }
}