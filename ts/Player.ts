import Entity from "./Entity.js";

export default class Player extends Entity {
    public tilePath: string;
    public tileSet: HTMLImageElement = document.createElement("img");
    public tileX: number;
    public tileY: number;
    public canGoRight: boolean = true;
    public canGoLeft: boolean = true;
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
        super(30, 0);
        this.tilePath = "/assets/gametcha/mario/placeHolder.png";
        this.tileX = 0;
        this.tileY = 500;
        this._frameNumber = 1;
        this._currentFrame = 0;
        this._state = 1;
        this._coinNumber = 0;
        this._livesNumber = 3;
        this._score = 0;
        this._XVelocity = 0;
        this._maxSpeed = 5;
        this._grounded = true;
        this._YVelocity = 0;
        this.tileSet.src = this.tilePath;
    }

    public async grounding(y: number) {
        this._posY = y;
        this._grounded = true;
    }
    public async ungrounding() {this._grounded = false;}
    public getXvelocity(): number {return this._XVelocity;}
    public getYvelocity(): number {return this._YVelocity;}

    public async moveRight() {
        if (this._XVelocity < this._maxSpeed && this.canGoRight)
            this._XVelocity += 0.2;
    }

    public async moveLeft() {
        if (this._XVelocity > 0 - this._maxSpeed && this.canGoLeft)
            this._XVelocity -= 0.3;
    }

    public async moveStop() {
        if (this._XVelocity > 0)
            this._XVelocity -= 0.3;
        else if (this._XVelocity < 0)
            this._XVelocity += 0.3;
    }

    public async jump() {
        if (this._grounded) {
            this._YVelocity = 0 - this._maxSpeed * 2.5;
            this._grounded = false;
        }
    }

    public async updatePosX() {
        this._posX += this._XVelocity;
    }

    public async updatePosY() {
        if (this._grounded)
            this._YVelocity = 0;
        else if (this._YVelocity < (this._maxSpeed * 2.5)) {
            this._YVelocity += 0.5;
        }

        this._posY += this._YVelocity;
    }

    public block(x: number) {
        this._XVelocity = 0;
        this._posX = x;
    }
}