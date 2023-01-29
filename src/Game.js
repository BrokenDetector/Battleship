import { updateDOM } from '.';
import Computer from './Computer';
import Gameboard from './Gameboard';
import Player from './Player';

export const gameboard = new Gameboard();

export default class Game {
    constructor() {
        this.player1 = new Player(gameboard, 'Player');
        this.player2 = new Computer(gameboard, 'Computer');
        this.currentPlayer = this.player1;
    };

    player1Turn(x, y) {
        const result = this.currentPlayer.attack(x, y);
        updateDOM(x, y, result);
        if (result === 'sunk') {
            this.checkForWinner();
        };
        this.currentPlayer = this.player2;
        this.player2Turn();
    };

    player2Turn() {
        const result = this.player2.randomAttack();
        updateDOM(this.player2.previousAttacks[this.player2.previousAttacks.length - 1].x,
            this.player2.previousAttacks[this.player2.previousAttacks.length - 1].y, result);
        if (result === 'sunk') {
            this.checkForWinner();
        };
    };

    ownerOfShip() {
        const arr = [...gameboard.ships];
        const player1ships = arr.filter(ship => ship.owner == 'player');
        const player2ships = arr.filter(ship => ship.owner == 'ai');
        return { player1ships, player2ships };
    };

    checkForWinner() {
        if (this.ownerOfShip().player1ships.every(ship => ship.sunk) || this.ownerOfShip().player2ships.every(ship => ship.sunk)) {
            this.endGame();
        };
    };

    endGame() {
        let winner = this.ownerOfShip().player1ships.every(ship => ship.sunk) ? this.player2.name : this.player1.name;
        alert(`${winner} wins!`);
    };
};
