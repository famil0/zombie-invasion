let placeSize = 30;
let col = 20;
let row = 20;
let map = [];

/**@type{HTMLDivElement}*/
let mapContainer = document.querySelector(".map-container");
/**@type{HTMLDivElement}*/
let root = document.querySelector(":root");



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
        d.addEventListener("click", click);
        map.push(d);
        mapContainer.appendChild(d);
    }
    map[Math.floor(col*row*Math.random())].classList.add("player");
}


function click(e) {
    let target = e.target;
    let idx = 0;
    for (let i = 0; i < map.length; i++) {
        if (map[i] == target) {
            idx = i;
            break;
        }
    }
    if (map[idx - col].classList.contains("player")) {
        console.log("move down");
        moveTo(idx, idx - col);
    }
    else if (map[idx + 1].classList.contains("player")) {
        console.log("move left");
        moveTo(idx, idx + 1);
    }
    else if (map[idx - 1].classList.contains("player")) {
        console.log("move right");
        moveTo(idx, idx - 1);
    }
    else if (map[idx + col].classList.contains("player")) {
        console.log("move up");
        moveTo(idx, idx + col);
    }
}

function moveTo(from, to) {
    map[to].classList.toggle("player");
    map[from].classList.toggle("player");
}