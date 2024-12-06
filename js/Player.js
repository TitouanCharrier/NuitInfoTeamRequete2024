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
    grounded;
    _YVelocity;
    width;
    height;
    constructor(w, h) {
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
    async grounding(y) {
        this._posY = y;
        this.grounded = true;
    }
    async ungrounding() { this.grounded = false; }
    getXvelocity() { return this._XVelocity; }
    getYvelocity() { return this._YVelocity; }
    setPosX(x) { this._posX = x; }
    setPosY(y) { this._posY = y; }
    async moveRight() {
        if (this._XVelocity < this._maxSpeed && this.canGoRight)
            if (this._XVelocity < 0)
                this._XVelocity += this._maxSpeed / 10;
            else
                this._XVelocity += this._maxSpeed / 30;
    }
    async moveLeft() {
        if (this._XVelocity > 0 - this._maxSpeed && this.canGoLeft)
            if (this._XVelocity > 0)
                this._XVelocity -= this._maxSpeed / 10;
            else
                this._XVelocity -= this._maxSpeed / 30;
    }
    async moveStop() {
        this._XVelocity = 0;
    }
    async jump() {
        if (this.grounded) {
            this._YVelocity = 0 - this._maxSpeed * 2;
            this.grounded = false;
        }
    }
    async updatePosX() {
        if (this._posX + (this.width / 25) + this._XVelocity < this.width && this._posX + this._XVelocity > 0)
            this._posX += this._XVelocity;
    }
    async updatePosY() {
        if (this.grounded)
            this._YVelocity = 0;
        else if (this._YVelocity < (this._maxSpeed * 2)) {
            this._YVelocity += this._maxSpeed / 10;
        }
        this._posY += this._YVelocity;
    }
    block(x) {
        this._XVelocity = 0;
        this._posX = x;
    }
}
