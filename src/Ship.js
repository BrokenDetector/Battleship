export default class Ship {
    constructor(length, owner) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.owner = owner;
    };

    hit() {
        this.hits++;
        if (this.hits === this.length) {
            this.sunk = true;
        };
    };

    isSunk() {
        return this.sunk;
    };
};  