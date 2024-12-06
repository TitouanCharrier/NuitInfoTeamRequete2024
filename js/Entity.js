export default class Entity {
    _posX;
    _posY;
    constructor(x, y) {
        this._posX = x;
        this._posY = y;
    }
    getPosX() { return this._posX; }
    getPosY() { return this._posY; }
}
