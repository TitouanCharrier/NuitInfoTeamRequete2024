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
    public grounded: boolean;
    private _YVelocity: number;
    public width: number;
    public height: number;

    public constructor(w: number, h: number) {
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
        this._maxSpeed = w / 200;
        this.grounded = true;
        this._YVelocity = 0;
        this.width = w;
        this.height = h;
        this.tileSet.src = this.tilePath;
    }

    public async grounding(y: number) {
        this._posY = y;
        this.grounded = true;
    }
    public async ungrounding() {this.grounded = false;}
    public getXvelocity(): number {return this._XVelocity;}
    public getYvelocity(): number {return this._YVelocity;}
    public setPosX(x: number) {this._posX = x;}
    public setPosY(y: number) {this._posY = y;}

    public async moveRight() {
        if (this._XVelocity < this._maxSpeed && this.canGoRight)
            if (this._XVelocity < 0)
                this._XVelocity += this._maxSpeed / 10;
            else this._XVelocity += this._maxSpeed / 30;
    }

    public async moveLeft() {
        if (this._XVelocity > 0 - this._maxSpeed && this.canGoLeft)
            if (this._XVelocity > 0)
                this._XVelocity -= this._maxSpeed / 10;
            else this._XVelocity -= this._maxSpeed / 30;
    }

    public async moveStop() {
        this._XVelocity = 0;
    }

    public async jump() {
        if (this.grounded) {
            this._YVelocity = 0 - this._maxSpeed * 2;
            this.grounded = false;
        }
    }

    public async updatePosX() {
        if (this._posX + (this.width / 25 )+ this._XVelocity < this.width && this._posX + this._XVelocity > 0)
            this._posX += this._XVelocity;
    }

    public async updatePosY() {
        if (this.grounded)
            this._YVelocity = 0;
        else if (this._YVelocity < (this._maxSpeed * 2)) {
            this._YVelocity += this._maxSpeed / 10;
        }

        this._posY += this._YVelocity;
    }

    public block(x: number) {
        this._XVelocity = 0;
        this._posX = x;
    }
}