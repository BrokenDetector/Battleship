import Game, { gameboard } from './Game';
import Ship from './Ship';

const shipAI = new Ship(2, 'ai');
const ship2AI = new Ship(5, 'ai');
const ship3AI = new Ship(4, 'ai');
const ship4AI = new Ship(3, 'ai');
const ship5AI = new Ship(3, 'ai');

gameboard.placeShip(coordsForAI(2).x, coordsForAI(2).y, shipAI);
gameboard.placeShip(coordsForAI(5).x, coordsForAI(5).y, ship2AI);
gameboard.placeShip(coordsForAI(4).x, coordsForAI(4).y, ship3AI);
gameboard.placeShip(coordsForAI(3).x, coordsForAI(3).y, ship4AI);
gameboard.placeShip(coordsForAI(3).x, coordsForAI(3).y, ship5AI);

// Game loop
const game = new Game();
const coordinates = document.querySelectorAll('.coordinate');
coordinates.forEach(coordinate => {
    coordinate.addEventListener('click', (e) => {
        if (e.target.className == 'coordinate') {
            const coordinates = e.target.id.split("-");
            const x = coordinates[0];
            const y = coordinates[1];
            if (x >= 10 || y > 10) game.player1Turn(x, y);
        };
    });
});

// Drag and drop
const dropOnBoard = document.querySelector('.player-grid');
const ships = document.querySelectorAll('.ship');
let type;
ships.forEach(ship => {
    ship.addEventListener('dragstart', e => {
        type = e.target;
    });
});

dropOnBoard.addEventListener('drop', e => {
    e.preventDefault();

    const coordinates = e.target.id.split("-");
    const x = parseInt(coordinates[0]);
    const y = parseInt(coordinates[1]);
    if (gameboard.grid[x][y] != null || 10 - x < getLength(type.id)) return;
    for (let i = x; i < x + getLength(type.id); i++) {
        if (gameboard.grid[i][y] != null) {
            return;
        };
    };

    gameboard.placeShip(x, y, new Ship(getLength(type.id), 'player'));
    type.remove();

    if (x < 10) {
        changeColor(x, y, type.id);
    };
    // Make AI Grid Active
    const newships = document.querySelectorAll('.ship');
    if (newships.length == 0) {
        const aiGrid = document.querySelector('.ai-grid');
        aiGrid.style.display = 'grid'
    };
});

dropOnBoard.addEventListener("dragenter", (e) => {
    e.preventDefault();
});

dropOnBoard.addEventListener("dragover", (e) => {
    e.preventDefault();
});

// Update after attacks
export function updateDOM(x, y, result) {
    let coordinate = document.getElementById(x + "-" + y);
    if (result === "miss") {
        coordinate.classList.add("miss");
    } else if (result === "hit") {
        coordinate.classList.add("hit");
    } else if (result === "sunk") {
        coordinate.classList.add("sunk");
    };
};

// Random coordinates
function coordsForAI(length) {
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 9);
    if (x < 10 || gameboard.grid[x][y] != null || 20 < x + length) {
        return coordsForAI(length);
    }
    else {
        for (let i = x; i < x + length; i++) {
            if (gameboard.grid[i][y] != null) {
                return coordsForAI(length);
            };
        };
        return { x, y };
    };
};
// Add color to my ships
function changeColor(x, y, type) {
    let myShip;
    const length = getLength(type);
    for (let i = x; i < x + length; i++) {
        myShip = document.getElementById(i + "-" + y);
        myShip.classList.add('myShip');
    };
};

function getLength(type) {
    let length;
    switch (type) {
        case "battleship":
            length = 4;
            break;
        case "carrier":
            length = 5;
            break;
        case "submarine":
            length = 3;
            break;
        case "destroyer":
            length = 3;
            break;
        case "patrolboat":
            length = 2;
            break;
    };
    return length;
};
