"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gametcha_js_1 = __importDefault(require("./gametcha.js"));
const attacks_json = __importStar(require("../assets/gametcha/attacks.json"));
const pokemons_json = __importStar(require("../assets/gametcha/pokemon.json"));
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
let salameche = new Pokemon(pokemons_json.jsonPokemons.Salamèche);
let rattata = new Pokemon(pokemons_json.jsonPokemons.Rattata);
let flameche = new Attack(attacks_json.jsonAttacks.Flammèche);
let charge = new Attack(attacks_json.jsonAttacks.Charge);
let vive_attaque = new Attack(attacks_json.jsonAttacks["Vive-attaque"]);
let griffe = new Attack(attacks_json.jsonAttacks.Griffe);
let jet_de_sable = new Attack(attacks_json.jsonAttacks["Jet de sable"]);
let rugissement = new Attack(attacks_json.jsonAttacks.Rugissement);
let mini_queue = new Attack(attacks_json.jsonAttacks["Mimi-queue"]);
let gametcha = new gametcha_js_1.default("cfgdg");
gametcha.show();
class Combat {
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
new Combat();
