import Entity from "./Entity.js";
export default class Block extends Entity {
    static tilePath = "/assets/gametcha/mario/placeHolder.png";
    static tileSet;
    tileX;
    tileY;
    _interact; // 0 = non interactable, 1 = [?] blocks, 2 = bricks
    _contains; // 0 = nothing, 1 = 1 coin, 2 = mushroom, 3 = flower, 4 = 1-up, 5 = star, 6-20 = number of coins
    _currentFrame;
    _frameNumber;
    solid;
    ;
    constructor(x, y, interact, contains, frameNumber, solid, tileX, tileY) {
        super(x, y);
        this._interact = interact;
        this._contains = contains;
        this._frameNumber = frameNumber;
        this._currentFrame = 0;
        this.solid = solid;
        this.tileX = tileX;
        this.tileY = tileY;
    }
    punched() {
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
    async _bump() {
    }
    async _bonus() {
    }
    async _breakAnim() {
    }
}
