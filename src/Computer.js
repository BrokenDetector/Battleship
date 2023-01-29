import Player from "./Player";

export default class ComputerPlayer extends Player {
    constructor(gameboard, name) {
        super(gameboard, name);
        this.previousAttacks = [];
    };

    randomAttack() {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (this.previousAttacks.some(coord => coord.x === x && coord.y === y));
        this.previousAttacks.push({ x, y });
        return this.attack(x, y);
    };
};