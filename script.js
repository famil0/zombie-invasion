let placeSize = 40;
let col = 20;
let row = 20;
let map = [];
let playerLocation = {
    x: 0,
    y: 0
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
        moveTo(playerLocation.x, playerLocation.y - 1);
    }
    else if (e.key == 's' && playerLocation.y < row - 1) {
        moveTo(playerLocation.x, playerLocation.y + 1);
    }
    else if (e.key == 'a' && playerLocation.x > 0) {
        moveTo(playerLocation.x - 1, playerLocation.y);
    }
    else if (e.key == 'd' && playerLocation.x < col - 1) {
        moveTo(playerLocation.x + 1, playerLocation.y);
    }

    if (e.key == 'i') {
        root.style.setProperty("--heading", "0deg");
    }
    else if (e.key == 'k') {
        root.style.setProperty("--heading", "180deg");
    }
    else if (e.key == 'l') {
        root.style.setProperty("--heading", "90deg");
    }
    else if (e.key == 'j') {
        root.style.setProperty("--heading", "270deg");
    }

    if (e.key == " ") {        
        removeFlashlights();
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

function moveTo(x, y) {
    map[playerLocation.x][playerLocation.y].classList.toggle("player");
    map[x][y].classList.toggle("player");
    playerLocation = {x, y};
    removeFlashlights();
    flashlight();
}

function flashlight() {
    if (flashlightIsOn) {
        for (let i = 0; i < 10; i++) {
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
}