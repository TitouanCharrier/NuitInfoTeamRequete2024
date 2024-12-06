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
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    start() {
        requestAnimationFrame(this.loop.bind(this));
    }
    loop() {
        // draw background
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // draw button
        this.context.fillStyle = '#eeaa00';
        this.context.fillRect(220, 100, 200, 75);
        this.context.fillStyle = '#001122';
        this.context.textAlign = 'center';
        this.context.font = '25px arial';
        this.context.fillText('Start Game', 320, 145, 200);
        requestAnimationFrame(this.loop.bind(this));
    }
}
