
export default class Gameboard {
    constructor() {
        this.grid = new Array(20).fill(null).map(() => new Array(10).fill(null));
        this.ships = [];
        this.missedAttacks = [];
    };

    placeShip(x, y, ship) {
        for (let i = x; i < x + ship.length; i++) {
            this.grid[i][y] = ship;
        };
        this.ships.push(ship);
        return ship;
    };

    receiveAttack(x, y) {
        if (this.grid[x][y] !== null) {
            this.grid[x][y].hit();
            if (this.grid[x][y].sunk) {
                return 'sunk';
            }
            return 'hit';
        }

        else {
            this.missedAttacks.push({ x, y });
            return 'miss';
        }
    };

    allSunk() {
        return this.ships.every(ship => ship.sunk);
    };
};