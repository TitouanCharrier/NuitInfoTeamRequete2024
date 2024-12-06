import Gametcha from "./gametcha.js";
import * as attacks_json from "./attacks_json.js";
import * as pokemons_json from "./pokemon_json.js";
class Attack {
    attack_struct;
    constructor(attack_struct) {
        this.attack_struct = attack_struct;
    }
    getName() {
        return this.attack_struct.name;
    }
    getType() {
        return this.attack_struct.type;
    }
    getCategorie() {
        return this.attack_struct.categorie;
    }
    getPriority() {
        return this.attack_struct.priority;
    }
    getPP() {
        return this.attack_struct.pp;
    }
    getPower() {
        return this.attack_struct.power;
    }
    getPrecision() {
        return this.attack_struct.precision;
    }
}
class Pokemon {
    pokemon_struct;
    constructor(pokemon_struct) {
        this.pokemon_struct = pokemon_struct;
    }
    getName() {
        return this.pokemon_struct.name;
    }
    getType() {
        return this.pokemon_struct.type;
    }
    getHP() {
        return this.pokemon_struct.HP;
    }
    getAtk() {
        return this.pokemon_struct.Atk;
    }
    getSpeAtk() {
        return this.pokemon_struct.SpeAtk;
    }
    getDef() {
        return this.pokemon_struct.Def;
    }
    getSpeed() {
        return this.pokemon_struct.Speed;
    }
}
let salameche = new Pokemon(pokemons_json.default.jsonPokemons.Salamèche);
let rattata = new Pokemon(pokemons_json.default.jsonPokemons.Rattata);
let flameche = new Attack(attacks_json.default.jsonAttacks.Flammèche);
let charge = new Attack(attacks_json.default.jsonAttacks.Charge);
let vive_attaque = new Attack(attacks_json.default.jsonAttacks["Vive-attaque"]);
let griffe = new Attack(attacks_json.default.jsonAttacks.Griffe);
let jet_de_sable = new Attack(attacks_json.default.jsonAttacks["Jet de sable"]);
let rugissement = new Attack(attacks_json.default.jsonAttacks.Rugissement);
let mini_queue = new Attack(attacks_json.default.jsonAttacks["Mimi-queue"]);
let gametcha = new Gametcha("cfgdg");
gametcha.show();
export default class Combat {
    canvas;
    context;
    mode;
    selected;
    constructor() {
        this.canvas = gametcha.canvas;
        let _context = this.canvas.getContext("2d");
        if (_context === null)
            throw new Error("Gametcha canvas context is null");
        this.context = _context;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;
        this.loop();
        this.mode = true;
        this.selected = 1;
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    start() {
        requestAnimationFrame(this.loop.bind(this));
    }
    button(pos_x, pos_y, width, height, text, selected) {
        if (selected) {
            this.context.fillStyle = '#58eb34';
            this.context.fillRect(pos_x, pos_y, width, height);
            this.context.fillStyle = '#000000';
            this.context.fillText(text, pos_x + width * 0.5, pos_y + height * 0.6);
        }
        else {
            this.context.fillStyle = '#bd0d00';
            this.context.fillRect(pos_x, pos_y, width, height);
            this.context.fillStyle = '#000000';
            this.context.fillText(text, pos_x + width * 0.5, pos_y + height * 0.6);
        }
    }
    loop() {
        // draw background
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // draw button
        this.context.fillStyle = '#eeaa00';
        let main_rect_pos_x = this.canvas.width * 0.1 * 0.5;
        let main_rect_width = this.canvas.width * 0.9;
        let main_rect_height = this.canvas.height * 0.3;
        let main_rect_pos_y = this.canvas.height - 10 - this.canvas.height * 0.3;
        let sub_rect_padding = main_rect_width * 0.03;
        this.context.fillRect(main_rect_pos_x, main_rect_pos_y, main_rect_width, main_rect_height);
        main_rect_pos_x += sub_rect_padding;
        main_rect_pos_y += sub_rect_padding;
        let sub_rect_width = main_rect_width * 0.4;
        let sub_rect_height = main_rect_height * 0.4;
        let sub_rect_pos_x_1 = main_rect_pos_x;
        let sub_rect_pos_y_1 = main_rect_pos_y;
        let sub_rect_pos_x_2 = main_rect_pos_x + sub_rect_width + sub_rect_padding * 4;
        let sub_rect_pos_y_2 = main_rect_pos_y;
        let sub_rect_pos_x_3 = main_rect_pos_x;
        let sub_rect_pos_y_3 = main_rect_pos_y + sub_rect_height + sub_rect_padding;
        let sub_rect_pos_x_4 = main_rect_pos_x + sub_rect_width + sub_rect_padding * 4;
        let sub_rect_pos_y_4 = main_rect_pos_y + sub_rect_height + sub_rect_padding;
        main_rect_pos_x -= sub_rect_padding;
        main_rect_pos_y -= sub_rect_padding;
        this.context.fillStyle = '#bd0d00';
        this.context.textAlign = 'center';
        this.context.font = '25px arial';
        switch (this.selected) {
            case 1: {
                if (this.mode) {
                    this.button(sub_rect_pos_x_1, sub_rect_pos_y_1, sub_rect_width, sub_rect_height, "Attack", true);
                    this.button(sub_rect_pos_x_2, sub_rect_pos_y_2, sub_rect_width, sub_rect_height, "Pokemon", false);
                    this.button(sub_rect_pos_x_3, sub_rect_pos_y_3, sub_rect_width, sub_rect_height, "Bag", false);
                    this.button(sub_rect_pos_x_4, sub_rect_pos_y_4, sub_rect_width, sub_rect_height, "Run", false);
                }
                else {
                    this.button(sub_rect_pos_x_1, sub_rect_pos_y_1, sub_rect_width, sub_rect_height, "ATK1", true);
                    this.button(sub_rect_pos_x_2, sub_rect_pos_y_2, sub_rect_width, sub_rect_height, "ATK2", false);
                    this.button(sub_rect_pos_x_3, sub_rect_pos_y_3, sub_rect_width, sub_rect_height, "ATK3", false);
                    this.button(sub_rect_pos_x_4, sub_rect_pos_y_4, sub_rect_width, sub_rect_height, "ATK4", false);
                }
            }
            case 2: {
                if (this.mode) {
                    this.button(sub_rect_pos_x_1, sub_rect_pos_y_1, sub_rect_width, sub_rect_height, "Attack", false);
                    this.button(sub_rect_pos_x_2, sub_rect_pos_y_2, sub_rect_width, sub_rect_height, "Pokemon", true);
                    this.button(sub_rect_pos_x_3, sub_rect_pos_y_3, sub_rect_width, sub_rect_height, "Bag", false);
                    this.button(sub_rect_pos_x_4, sub_rect_pos_y_4, sub_rect_width, sub_rect_height, "Run", false);
                }
                else {
                    this.button(sub_rect_pos_x_1, sub_rect_pos_y_1, sub_rect_width, sub_rect_height, "ATK1", false);
                    this.button(sub_rect_pos_x_2, sub_rect_pos_y_2, sub_rect_width, sub_rect_height, "ATK2", true);
                    this.button(sub_rect_pos_x_3, sub_rect_pos_y_3, sub_rect_width, sub_rect_height, "ATK3", false);
                    this.button(sub_rect_pos_x_4, sub_rect_pos_y_4, sub_rect_width, sub_rect_height, "ATK4", false);
                }
            }
            case 3: {
                if (this.mode) {
                    this.button(sub_rect_pos_x_1, sub_rect_pos_y_1, sub_rect_width, sub_rect_height, "Attack", false);
                    this.button(sub_rect_pos_x_2, sub_rect_pos_y_2, sub_rect_width, sub_rect_height, "Pokemon", false);
                    this.button(sub_rect_pos_x_3, sub_rect_pos_y_3, sub_rect_width, sub_rect_height, "Bag", true);
                    this.button(sub_rect_pos_x_4, sub_rect_pos_y_4, sub_rect_width, sub_rect_height, "Run", false);
                }
                else {
                    this.button(sub_rect_pos_x_1, sub_rect_pos_y_1, sub_rect_width, sub_rect_height, "ATK1", false);
                    this.button(sub_rect_pos_x_2, sub_rect_pos_y_2, sub_rect_width, sub_rect_height, "ATK2", false);
                    this.button(sub_rect_pos_x_3, sub_rect_pos_y_3, sub_rect_width, sub_rect_height, "ATK3", true);
                    this.button(sub_rect_pos_x_4, sub_rect_pos_y_4, sub_rect_width, sub_rect_height, "ATK4", false);
                }
            }
            case 4: {
                if (this.mode) {
                    this.button(sub_rect_pos_x_1, sub_rect_pos_y_1, sub_rect_width, sub_rect_height, "Attack", false);
                    this.button(sub_rect_pos_x_2, sub_rect_pos_y_2, sub_rect_width, sub_rect_height, "Pokemon", false);
                    this.button(sub_rect_pos_x_3, sub_rect_pos_y_3, sub_rect_width, sub_rect_height, "Bag", false);
                    this.button(sub_rect_pos_x_4, sub_rect_pos_y_4, sub_rect_width, sub_rect_height, "Run", true);
                }
                else {
                    this.button(sub_rect_pos_x_1, sub_rect_pos_y_1, sub_rect_width, sub_rect_height, "ATK1", false);
                    this.button(sub_rect_pos_x_2, sub_rect_pos_y_2, sub_rect_width, sub_rect_height, "ATK2", false);
                    this.button(sub_rect_pos_x_3, sub_rect_pos_y_3, sub_rect_width, sub_rect_height, "ATK3", false);
                    this.button(sub_rect_pos_x_4, sub_rect_pos_y_4, sub_rect_width, sub_rect_height, "ATK4", true);
                }
            }
        }
        this.canvas.addEventListener('click', function () { }, false);
        requestAnimationFrame(this.loop.bind(this));
        console.log(this.selected);
    }
}
