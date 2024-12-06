import Tile from "./Tile";

export default abstract class Entity {
    protected _posX: number;
    protected _posY: number;
    
    public constructor(x: number, y: number) {
        this._posX = x;
        this._posY = y;
    }

    public getPosX() {return this._posX;}
    public getPosY() {return this._posY;}
}