export default class BulletHell {
    player;
    gametcha;
    context;
    movementKeys;
    gameScreen;
    uiScreen;
    projectiles;
    gameRunning;
    frameCount;
    constructor(gametcha) {
        this.gameRunning = true;
        this.frameCount = 0;
        this.movementKeys = [];
        this.projectiles = [];
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
            health: 10,
            maxHealth: 10,
            dmgCooldown: 0,
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
            }
        });
    }
    drawElt(elt) {
        this.context.drawImage(elt.img, elt.x + this.gameScreen.x, elt.y + this.gameScreen.y, elt.width, elt.height);
    }
    randInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    addRandomProjectile() {
        let direction = this.randInt(0, 4);
        let p = {
            x: 0,
            y: 0,
            width: 80,
            height: 80,
            damage: 1,
            spX: 0,
            spY: 0,
            img: document.createElement("img")
        };
        p.img.src = "/assets/gametcha/bullet-hell/projectile1.png";
        if (direction < 2) {
            // Horizontal speed
            p.y = this.randInt(0, this.gameScreen.h - p.height);
            p.x -= p.width;
            p.spX = this.randInt(2, 6);
            // if direction === 0 the attack comes from the left ; otherwise it comes from the right
            if (direction === 1) {
                p.x = this.gameScreen.w;
                p.spX *= -1;
            }
        }
        else {
            // Vertical speed
            p.x = this.randInt(0, this.gameScreen.w - p.width);
            p.y -= p.height;
            p.spY = this.randInt(2, 6);
            // if direction === 2 the attack comes from the top ; otherwise it comes from the bottom
            if (direction === 3) {
                p.y = this.gameScreen.h;
                p.spY *= -1;
            }
        }
        this.projectiles.push(p);
    }
    isInbound(player, proj) {
        if (((player.x + player.width > proj.x) && (player.x < proj.x + proj.width)) && ((player.y + player.health > proj.y) && (player.y < proj.y + proj.height))) {
            return true;
        }
        else {
            return false;
        }
    }
    loop() {
        // Stop the game after 15 seconds
        if (this.frameCount++ === 900 || this.player.health <= 0)
            this.gameRunning = false;
        // Stop requesting the animation after 15 seconds
        if (this.gameRunning)
            window.requestAnimationFrame(this.loop.bind(this));
        else {
            this.frameCount = 0;
            window.requestAnimationFrame(this.endLoop.bind(this));
        }
        // Add a projectile every 23 frames
        if (this.frameCount % 23 === 0)
            this.addRandomProjectile();
        /// Physics handling
        if (this.player.dmgCooldown > 0)
            this.player.dmgCooldown--;
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
        this.projectiles.forEach((p, i, arr) => {
            p.x += p.spX;
            p.y += p.spY;
            // Check if the projectile is outside the game screen
            if (p.x + p.width <= 0 || p.y + p.height <= 0 || p.x >= this.gameScreen.w || p.y >= this.gameScreen.h)
                arr.splice(i, 1);
            // Collision checks with the player
            if (this.isInbound(this.player, p) && this.player.dmgCooldown === 0) {
                this.player.health -= p.damage;
                this.player.dmgCooldown = 20;
            }
        });
        /// Rendering
        if (this.player.dmgCooldown > 0) {
            // Canvas refresh
            this.context.fillRect(0, 0, this.gametcha.canvas.width, this.gametcha.canvas.height);
            // Game screen fill
            this.context.clearRect(this.gameScreen.x, this.gameScreen.y, this.gameScreen.w, this.gameScreen.h);
        }
        else {
            // Canvas refresh
            this.context.clearRect(0, 0, this.gametcha.canvas.width, this.gametcha.canvas.height);
            // Game screen fill
            this.context.fillRect(this.gameScreen.x, this.gameScreen.y, this.gameScreen.w, this.gameScreen.h);
        }
        // UI rendering (health)
        this.context.fillRect(this.uiScreen.x, this.uiScreen.y, this.uiScreen.w, this.uiScreen.h);
        this.context.clearRect(this.uiScreen.x + 20, this.uiScreen.y + 20, this.uiScreen.w - 40, this.uiScreen.h - 40);
        this.context.fillStyle = "#ff0000";
        this.context.fillRect(this.uiScreen.x + 20, this.uiScreen.y + 20, (this.uiScreen.w - 40) * this.player.health / this.player.maxHealth, this.uiScreen.h - 40);
        this.context.fillStyle = "#000000";
        this.drawElt(this.player);
        this.projectiles.forEach((p) => {
            this.drawElt(p);
        });
    }
    endLoop() {
        if (this.frameCount++ < 60)
            window.requestAnimationFrame(this.endLoop.bind(this));
        let fillColor;
        if (this.player.health <= 0) {
            fillColor = Math.floor(255 - (this.frameCount * 255 / 60)).toString(16);
        }
        else {
            fillColor = Math.floor(this.frameCount * 255 / 60).toString(16);
        }
        if (fillColor.length === 1)
            fillColor = "0" + fillColor;
        this.context.fillStyle = "#" + fillColor.repeat(3);
        this.context.fillRect(0, 0, this.gametcha.canvas.width, this.gametcha.canvas.height);
    }
}
