"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BulletHell {
    player;
    gametcha;
    context;
    movementKeys;
    gameScreen;
    uiScreen;
    constructor(gametcha) {
        this.movementKeys = [];
        let baseMovementSpeed = 3;
        let border = 20;
        let uiHeight = 60;
        this.movementKeys.push({ code: "ArrowUp", state: false, xMovement: 0, yMovement: -baseMovementSpeed }, // Up arrow
        { code: "ArrowLeft", state: false, xMovement: -baseMovementSpeed, yMovement: 0 }, // Left arrow
        { code: "ArrowDown", state: false, xMovement: 0, yMovement: baseMovementSpeed }, // Down arrow
        { code: "ArrowRight", state: false, xMovement: baseMovementSpeed, yMovement: 0 });
        window.addEventListener("keydown", this.keyPressAction.bind(this));
        window.addEventListener("keyup", this.keyPressAction.bind(this));
        this.gametcha = gametcha;
        this.gameScreen = { x: border, y: border, w: this.gametcha.canvas.width - 2 * border, h: this.gametcha.canvas.height - border - uiHeight };
        this.uiScreen = { x: 0, y: this.gameScreen.h + 2 * border, w: this.gametcha.canvas.width, h: uiHeight };
        let _context = this.gametcha.canvas.getContext("2d");
        if (_context === null)
            throw new Error("Gametcha canvas context is null");
        this.context = _context;
        this.player = {
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            health: 20,
            img: document.createElement("img")
        };
        this.player.img.src = "/assets/gametcha/bullet-hell/ud-heart.png";
        this.player.img.width = 20;
        this.player.img.height = 20;
    }
    start() {
        window.requestAnimationFrame(this.loop.bind(this));
    }
    keyPressAction(event) {
        this.movementKeys.forEach((movementKey) => {
            if (event.code === movementKey.code) {
                movementKey.state = event.type === "keydown";
                console.log(event);
            }
        });
    }
    drawPlayer() {
        this.context.drawImage(this.player.img, this.player.x + this.gameScreen.x, this.player.y + this.gameScreen.y, this.player.width, this.player.height);
    }
    loop() {
        window.requestAnimationFrame(this.loop.bind(this));
        /// Physics handling
        this.movementKeys.forEach((mKey) => {
            if (mKey.state) {
                this.player.x += mKey.xMovement;
                this.player.y += mKey.yMovement;
                if (this.player.x < 0)
                    this.player.x = 0;
                if (this.player.y < 0)
                    this.player.y = 0;
                if (this.player.x > this.gameScreen.w - this.player.width)
                    this.player.x = this.gameScreen.w - this.player.width;
                if (this.player.y > this.gameScreen.h - this.player.height)
                    this.player.y = this.gameScreen.h - this.player.height;
            }
        });
        /// Rendering
        // Canvas refresh
        this.context.clearRect(0, 0, this.gametcha.canvas.width, this.gametcha.canvas.height);
        // Game screen fill
        this.context.fillRect(this.gameScreen.x, this.gameScreen.y, this.gameScreen.w, this.gameScreen.h);
        this.drawPlayer();
    }
}
exports.default = BulletHell;
