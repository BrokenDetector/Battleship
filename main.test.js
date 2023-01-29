import Gameboard from './src/Gameboard';
import Player from './src/Player';
import Ship from './src/Ship';

describe('Ship', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(5, 'player');
    });

    test('hit increases the number of hits on the ship', () => {
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test('isSunk returns true if the ship is sunk', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });

    test('isSunk returns false if the ship is not sunk', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });
});

describe('Player', () => {
    let gameboard, player;

    beforeEach(() => {
        gameboard = new Gameboard();
        player = new Player(gameboard, 'player');
    });

    test('attack returns "miss" if the attack misses', () => {
        expect(player.attack(1, 1)).toBe('miss');
    });

    test('attack returns "hit" if the attack hits a ship', () => {
        gameboard.grid[1][1] = { hit: jest.fn() };
        expect(player.attack(1, 1)).toBe('hit');
    });

    test('attack returns "sunk" if the attack sinks a ship', () => {
        gameboard.grid[1][1] = new Ship(1, 'ai');
        expect(player.attack(1, 1)).toBe('sunk');
    });
});


describe('Gameboard', () => {
    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('should initialize with a grid of 20x10', () => {
        expect(gameboard.grid.length).toBe(20);
        expect(gameboard.grid[0].length).toBe(10);
    });

    test('should place a ship on the grid', () => {
        const ship = { length: 2 };
        gameboard.placeShip(0, 0, ship);
        expect(gameboard.grid[0][0]).toBe(ship);
        expect(gameboard.grid[1][0]).toBe(ship);
    });

    test('should register a hit on a ship', () => {
        const ship = { length: 2, hit: jest.fn() };
        gameboard.placeShip(0, 0, ship);
        gameboard.receiveAttack(0, 0);
        expect(ship.hit).toHaveBeenCalled();
    });

    test('should register a miss', () => {
        gameboard.receiveAttack(0, 0);
        expect(gameboard.missedAttacks.length).toBe(1);
        expect(gameboard.missedAttacks[0]).toEqual({ x: 0, y: 0 });
    });

    test('should return "sunk" if a ship is sunk', () => {
        const ship = new Ship(2, 'ai');
        gameboard.placeShip(0, 0, ship);
        gameboard.receiveAttack(0, 0);
        expect(gameboard.receiveAttack(1, 0)).toBe('sunk');
    });

    test('should return "hit" if a ship is hit but not sunk', () => {
        const ship = { length: 2, hit: jest.fn(), isSunk: jest.fn(() => false) };
        gameboard.placeShip(0, 0, ship);
        gameboard.receiveAttack(0, 0);
        expect(gameboard.receiveAttack(1, 0)).toBe('hit');
    });

    test('should return "miss" if no ship is hit', () => {
        expect(gameboard.receiveAttack(0, 0)).toBe('miss');
    });

    test('should check if all ships have been sunk', () => {
        const ship1 = new Ship(2, 'ai');
        const ship2 = new Ship(3, 'ai');
        gameboard.placeShip(0, 0, ship1);
        gameboard.placeShip(2, 0, ship2);
        expect(gameboard.allSunk()).toBe(false);
    });
});