
export default class Player {
    constructor(gameboard, name) {
        this.gameboard = gameboard;
        this.name = name;
    };

    attack(x, y) {
        return this.gameboard.receiveAttack(x, y);
    };
};