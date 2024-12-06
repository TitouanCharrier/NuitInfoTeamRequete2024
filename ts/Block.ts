import Entity from "./Entity.js";

export default class Block extends Entity {
    public static tilePath: string = "/assets/gametcha/mario/placeHolder.png"
    public static tileSet: HTMLImageElement;
    public tileX: number;
    public tileY: number;
    private _interact: number; // 0 = non interactable, 1 = [?] blocks, 2 = bricks
    private _contains: number; // 0 = nothing, 1 = 1 coin, 2 = mushroom, 3 = flower, 4 = 1-up, 5 = star, 6-20 = number of coins
    private _currentFrame: number;
    private _frameNumber: number;
    public solid: boolean;;

    public constructor(x: number, y: number, interact: number, contains: number, frameNumber: number, solid: boolean, tileX: number, tileY: number) {
        super(x, y);
        this._interact = interact;
        this._contains = contains;
        this._frameNumber = frameNumber;
        this._currentFrame = 0;
        this.solid = solid;
        this.tileX = tileX;
        this.tileY = tileY;
    }

    public punched() {
        if (this._interact != 0 && this.solid === true) {
            this._bump();
            if (this._interact == 1) {
                this._bonus();
                this._frameNumber = 1;
                this._currentFrame = 3;
            }
            else if (this._interact == 2) {
                this._breakAnim();
                this.solid = false;
            }
        }
    }

    private async _bump() {
        
    }

    private async _bonus() {
        
    }

    private async _breakAnim() {

    }
        
}