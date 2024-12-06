import Player from "./Player.js";
import Entity from "./Entity.js";
import Gametcha from "./gametcha.js";
import Block from "./Block.js";
import MovementKey from "./MovementKey.js";

export default class GameWindow {
    public blocks: Block[] = [];
    public map: number[][];
    public player: Player = new Player();
    private _tileHeight: number;
    private _tileWidth: number;
    public gameOn: boolean = true;
    private _window: Gametcha;
    private _context: CanvasRenderingContext2D;
    public tileSize: number = 50;
    private _movementKeys: MovementKey[];

    public constructor(gametcha: Gametcha) {
        this.map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this._mappingBlocks();
        Block.tileSet = document.createElement("img");
        Block.tileSet.src = Block.tilePath;
    
        this._tileHeight = 15;
        this._tileWidth = 15;
        this._window = gametcha;
        let context = this._window.canvas.getContext("2d");
        
        if (context === null)
            throw new Error("Gametcha canvas context is null");
            
        this._context = context;

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
        console.log(this.player.getPosY());
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
        this.blocks.forEach(e => {
            if (e.solid) {
                if ((e.getPosY() - (this.player.getPosY() + this.tileSize)) <= 0) {
                    //console.log("Y check");
                    if ((e.getPosX() - (this.player.getPosX() + this.tileSize)) <= 0 && ((e.getPosX() + this.tileSize) - (this.player.getPosX())) >= 0) {
                        this.player.grounding((e.getPosY() - this.tileSize));
                    // console.log("grounding");
                    }
                }
                else {
                    this.player.ungrounding();
                    //console.log("ungrounding");
                }

                // Collision axe X vers la droite
                if ((e.getPosX() - (this.player.getPosX() + this.tileSize)) < 0) {   
                    if ((e.getPosY() - (this.player.getPosY() + this.tileSize)) < 0 && ((e.getPosY() + this.tileSize) - this.player.getPosY() > 0 )) {
                        this.player.canGoRight = false;
                        console.log("collision");
                        /*if (this.player.getXvelocity() > 0)
                            this.player.block(e.getPosX() - this.tileSize);*/
                    }
                }

                // Collision axe X vers la gauche
                else if (((e.getPosX() + this.tileSize) - this.player.getPosX()) > 0) {   
                    if ((e.getPosY() - (this.player.getPosY() + this.tileSize )) < 0 && ((e.getPosY() + this.tileSize) - this.player.getPosY() > 0 )) {
                        this.player.canGoLeft = false;
                        console.log("collision : (" + e.getPosY() + ", " + (e.getPosY() + this.tileSize) + ")");
                        /*if (this.player.getXvelocity() < 0)
                            this.player.block(e.getPosX() + this.tileSize);*/
                    }
                }
            }
        });
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