let placeSize = 30;
let col = 20;
let row = 20;
let map = [];
let playerIdx;

/**@type{HTMLDivElement}*/
let mapContainer = document.querySelector(".map-container");
/**@type{HTMLDivElement}*/
let root = document.querySelector(":root");

document.body.addEventListener("keypress", keyPress);



main();


function main() {
    mapContainer.style.setProperty("--col", col);
    root.style.setProperty("--size", placeSize + "px");
    newMap();
}

function newMap() {
    for (let i = 0; i < col * row; i++) {        
        let d = document.createElement("div");
        d.classList.add("place");
        map.push(d);
        mapContainer.appendChild(d);
    }
    let r = Math.floor(col*row*Math.random());
    map[r].classList.add("player");
    playerIdx = r;
}

function keyPress(e) {
    if (e.key == 'w' && playerIdx >= col) {
        moveFromTo(playerIdx, playerIdx - col);
    }
    else if (e.key == 's' && playerIdx < col * row - col) {
        moveFromTo(playerIdx, playerIdx + col);
    }
    else if (e.key == 'd' && (playerIdx + 1) % col != 0) {
        moveFromTo(playerIdx, playerIdx + 1);
    }
    else if (e.key == 'a' && playerIdx % col != 0) {
        moveFromTo(playerIdx, playerIdx - 1);
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
}

function moveFromTo(from, to) {
    map[to].classList.toggle("player");
    map[from].classList.toggle("player");
    playerIdx = to;
}