import Entity from "./Entity.js";
export default class Player extends Entity {
    tilePath;
    tileSet = document.createElement("img");
    tileX;
    tileY;
    canGoRight = true;
    canGoLeft = true;
    _frameNumber;
    _currentFrame;
    _state; // 0 = in animation, 1 = small, 2 = big, 3 = flower, 4 = star
    _coinNumber;
    _livesNumber;
    _score;
    _XVelocity;
    _maxSpeed;
    _grounded;
    _YVelocity;
    constructor() {
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
    async grounding(y) {
        this._posY = y;
        this._grounded = true;
    }
    async ungrounding() { this._grounded = false; }
    getXvelocity() { return this._XVelocity; }
    getYvelocity() { return this._YVelocity; }
    async moveRight() {
        if (this._XVelocity < this._maxSpeed && this.canGoRight)
            this._XVelocity += 0.2;
    }
    async moveLeft() {
        if (this._XVelocity > 0 - this._maxSpeed && this.canGoLeft)
            this._XVelocity -= 0.3;
    }
    async moveStop() {
        if (this._XVelocity > 0)
            this._XVelocity -= 0.3;
        else if (this._XVelocity < 0)
            this._XVelocity += 0.3;
    }
    async jump() {
        if (this._grounded) {
            this._YVelocity = 0 - this._maxSpeed * 2.5;
            this._grounded = false;
        }
    }
    async updatePosX() {
        this._posX += this._XVelocity;
    }
    async updatePosY() {
        if (this._grounded)
            this._YVelocity = 0;
        else if (this._YVelocity < (this._maxSpeed * 2.5)) {
            this._YVelocity += 0.5;
        }
        this._posY += this._YVelocity;
    }
    block(x) {
        this._XVelocity = 0;
        this._posX = x;
    }
}
