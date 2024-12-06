import Entity from "./Entity";
import Tile from "./Tile";

export default class Player extends Entity {
    public tilePath: string;
    public tileSet: HTMLImageElement = document.createElement("img");
    public tileX: number;
    public tileY: number;
    private _frameNumber: number;
    private _currentFrame: number;
    private _state: number; // 0 = in animation, 1 = small, 2 = big, 3 = flower, 4 = star
    private _coinNumber: number;
    private _livesNumber: number;
    private _score: number;
    private _XVelocity: number;
    private _maxSpeed: number;
    private _grounded: boolean;
    private _YVelocity: number;

    public constructor() {
        super(0, 0);
        this.tilePath = "/assets/gametcha/mario/mario.gif";
        this.tileX = 50;
        this.tileY = 50;
        this._frameNumber = 1;
        this._currentFrame = 0;
        this._state = 1;
        this._coinNumber = 0;
        this._livesNumber = 3;
        this._score = 0;
        this._XVelocity = 0;
        this._maxSpeed = 10;
        this._grounded = true;
        this._YVelocity = 0;
        this.tileSet.src = this.tilePath;
    }

    

    public async moveRight() {
        if (this._XVelocity < this._maxSpeed)
            this._XVelocity += 2;
    }

    public async moveLeft() {
        if (this._XVelocity > 0 - this._maxSpeed)
            this._XVelocity -= 2;
    }

    public async moveStop() {
        if (this._XVelocity > 0)
            this._XVelocity -= 2;
        else if (this._XVelocity < 0)
            this._XVelocity += 2;
    }

    public async jump() {
        if (this._grounded) 
            this._YVelocity = this._maxSpeed * 2;
    }

    public async updatePosX() {
        this._posX += this._XVelocity;
    }

    public async updatePosY() {
        this._posY += this._YVelocity;
        if (!this._grounded && this._YVelocity > 0 - this._maxSpeed) {
            this._YVelocity -= 5;
        }
    }
}