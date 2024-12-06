import Player from "./Player.js";
import Entity from "./Entity.js";
import Gametcha from "./gametcha.js";
import Block from "./Block.js";
import MovementKey from "./MovementKey.js";

export default class GameWindow {
    public blocks: Block[] = [];
    public map: number[][];
    private mapSet: number [][][];
    public player: Player;
    public gameOn: boolean = true;
    private _window: Gametcha;
    private _context: CanvasRenderingContext2D;
    public tileSize: number = 20;
    private _movementKeys: MovementKey[];

    public constructor(gametcha: Gametcha) {
        this.mapSet = [
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1]
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1]
        ]
    ];

        this.map = this.mapSet[Math.floor(Math.random() * 3)];
        Block.tileSet = document.createElement("img");
        Block.tileSet.src = Block.tilePath;
    
        this._window = gametcha;
        let context = this._window.canvas.getContext("2d");
        
        if (context === null)
            throw new Error("Gametcha canvas context is null");
            
        this._context = context;

        this.tileSize = this._window.canvas.width / 25;
        this.player = new Player(this._window.canvas.width, this._window.canvas.height);
        this._mappingBlocks();

        this._movementKeys = []
        this._movementKeys.push(
            {code: "ArrowUp", state: false},   // Up arrow
            {code: "ArrowLeft", state: false},   // Left arrow
            {code: "ArrowDown", state: false},   // Down arrow
            {code: "ArrowRight", state: false},   // right arrow
        );
        window.addEventListener("keydown", this.keyPressAction.bind(this));
        window.addEventListener("keyup", this.keyPressAction.bind(this));

        this.game();
    }

    public start() {
        window.requestAnimationFrame(this.game.bind(this));
    }

    private keyPressAction(event: KeyboardEvent) {
        this._movementKeys.forEach((movementKey: MovementKey) => {
            if (event.code === movementKey.code) {
                movementKey.state = event.type === "keydown";
            }
        });
    }

    public game() {

        if (this.gameOn) window.requestAnimationFrame(this.game.bind(this));

        this.draw();

        this.detectCollision();

        let anyKey : boolean = false;
        this._movementKeys.forEach(e => {
            if (e.state) {
                anyKey = true;
                if (e.code == "ArrowRight") {
                    this.player.moveRight();
                }
                if (e.code == "ArrowLeft") {
                    this.player.moveLeft();
                }
                if (e.code == "ArrowUp") {
                    this.player.jump();
                }
            }
        });
        if (!anyKey) this.player.moveStop();

        this.player.updatePosX();
        this.player.updatePosY();
        
        if (this.player.getPosY() + this.tileSize >= this._window.canvas.height) {
            this._window.validate(false);
        }

        if (this.player.getPosX() + this.tileSize >= (22 * this.tileSize)) {
            this._window.validate(true);
        }
    }

    private draw() {
        this._context.clearRect(0, 0, this._window.canvas.width, this._window.canvas.height);

        this.blocks.forEach( e => {
            this._context.drawImage(Block.tileSet,e.tileX, e.tileY, this.tileSize, this.tileSize, e.getPosX(), e.getPosY(), this.tileSize, this.tileSize);
        });

        this._context.drawImage(this.player.tileSet, this.player.tileX, this.player.tileY, this.tileSize, this.tileSize, this.player.getPosX(), this.player.getPosY(), this.tileSize, this.tileSize);
    }

    public detectCollision() {
        this.player.canGoLeft = true;
        this.player.canGoRight = true;
        let maxHeight: number = -10000;
        let toGround: boolean = false;
        let wallCollision = false;
        let posX : number = this.player.getPosX();
        this.blocks.forEach(e => {
            if (e.solid) {
                // Collision axe X vers la droite
                if ((this.player.getPosX() + this.tileSize > e.getPosX()) && (this.player.getPosX() < e.getPosX())) {   
                    if ((e.getPosY() - (this.player.getPosY() + this.tileSize)) < 0 && ((e.getPosY() + this.tileSize) - this.player.getPosY() > 0 )) {
                        this.player.canGoRight = false;
                        console.log("collision");
                        wallCollision = true;
                        posX = e.getPosX() - this.tileSize;
                    }
                }

                // Collision axe X vers la gauche ((e.getPosX() + this.tileSize) - this.player.getPosX()) > 0
                else if ((this.player.getPosX() < e.getPosX() + this.tileSize) && (this.player.getPosX() > e.getPosX())) {   
                    if ((e.getPosY() - (this.player.getPosY() + this.tileSize )) < 0 && ((e.getPosY() + this.tileSize) - this.player.getPosY() > 0 )) {
                        this.player.canGoLeft = false;
                        console.log("collision : (" + e.getPosY() + ", " + (e.getPosY() + this.tileSize) + ")");
                        wallCollision = true;
                        posX = e.getPosX() + this.tileSize;
                    }
                }

                if ((e.getPosY() - (this.player.getPosY() + this.tileSize)) <= 0) {
                    //console.log("Y check");
                    if (!this.player.grounded && (e.getPosX() - (this.player.getPosX() + this.tileSize)) < 0 && ((e.getPosX() + this.tileSize) - (this.player.getPosX())) > 0) {
                        if ((e.getPosY() - this.tileSize) > maxHeight)
                            maxHeight = e.getPosY() - this.tileSize; 
                        toGround = true;
                    // console.log("grounding");
                    }
                }
                else {
                    this.player.ungrounding();
                    //console.log("ungrounding");
                }
            }
        });
            if (!this.player.grounded) {
                if (toGround) this.player.grounding(maxHeight)
            } else {
                if (wallCollision && this.player.getXvelocity() > 0) this.player.block(posX);
                if (wallCollision && this.player.getXvelocity() < 0) this.player.block(posX);
            }
    }

    private _reset() {
        this.map = this.mapSet[Math.floor(Math.random() * 3)];
        this._mappingBlocks();
        this.player.setPosX(10);
        this.player.setPosY(10);
    }

    private _mappingBlocks() {
        let x = 0;
        let y = 0;
        this.map.forEach(e => {
            e.forEach(e => {
                if (e === 0)
                    this.blocks.push(new Block(x, y, 0, 0, 1, false, 0, 0));
                else if (e === 1)
                    this.blocks.push(new Block(x, y, 0, 0, 1, true, 250, 0));
                else if (e === 2)
                    this.blocks.push(new Block(x, y, 0, 0, 1, true, 350, 0))
                x += this.tileSize;
            }); 
            y += this.tileSize;
            x = 0;
        });
    }
}