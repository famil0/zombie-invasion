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

    if (e.key == 'w') {
        moveFromTo(playerIdx, playerIdx - col);
    }
    else if (e.key == 's') {
        moveFromTo(playerIdx, playerIdx + col);
    }
    else if (e.key == 'd') {
        moveFromTo(playerIdx, playerIdx + 1);
    }
    else if (e.key == 'a') {
        moveFromTo(playerIdx, playerIdx - 1);
    }
}

function moveFromTo(from, to) {
    map[to].classList.toggle("player");
    map[from].classList.toggle("player");
    playerIdx = to;
}