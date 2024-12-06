import Gametcha from "./gametcha.js";
import * as attacks_json from "./attacks_json.js"
import * as pokemons_json from "./pokemon_json.js"


interface Attack_struct{
    name: string;
    type: string;
    categorie: string;
    power: number;
    precision: number;
    priority: number;
    pp : number;
}

interface Pokemon_struct{
    sprite: string;
    name: string;
    type: string;
    HP: number;
    Atk: number;
    Def: number;
    SpeAtk: number;
    Speed: number;
}

class Attack {
    private attack_struct: Attack_struct;

    public constructor(attack_struct: Attack_struct){
        this.attack_struct = attack_struct;
    }

    public getName(){
        return this.attack_struct.name;
    }

    public getType(){
        return this.attack_struct.type;
    }

    public getCategorie(){
        return this.attack_struct.categorie;
    }

    public getPriority(){
        return this.attack_struct.priority;
    }

    public getPP(){
        return this.attack_struct.pp;
    }

    public getPower(){
        return this.attack_struct.power;
    }

    public getPrecision(){
        return this.attack_struct.precision;
    }
}

class Pokemon {
    private pokemon_struct: Pokemon_struct;

    public constructor(pokemon_struct: Pokemon_struct){
        this.pokemon_struct = pokemon_struct;
    }

    public getName(){
        return this.pokemon_struct.name;
    }

    public getType(){
        return this.pokemon_struct.type;
    }

    public getHP(){
        return this.pokemon_struct.HP;
    }

    public getAtk(){
        return this.pokemon_struct.Atk;
    }

    public getSpeAtk(){
        return this.pokemon_struct.SpeAtk;
    }

    public getDef(){
        return this.pokemon_struct.Def;
    }

    public getSpeed(){
        return this.pokemon_struct.Speed;
    }
}

let salameche: Pokemon = new Pokemon(pokemons_json.default.jsonPokemons.Salamèche);
let rattata: Pokemon = new Pokemon(pokemons_json.default.jsonPokemons.Rattata);
let flameche: Attack = new Attack(attacks_json.default.jsonAttacks.Flammèche);
let charge: Attack = new Attack(attacks_json.default.jsonAttacks.Charge);
let vive_attaque: Attack = new Attack(attacks_json.default.jsonAttacks["Vive-attaque"]);
let griffe: Attack = new Attack(attacks_json.default.jsonAttacks.Griffe);
let jet_de_sable: Attack = new Attack(attacks_json.default.jsonAttacks["Jet de sable"]);
let rugissement: Attack = new Attack(attacks_json.default.jsonAttacks.Rugissement);
let mini_queue: Attack = new Attack(attacks_json.default.jsonAttacks["Mimi-queue"]);

let gametcha = new Gametcha("cfgdg");
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
    getRandomInt(min: number, max: number) {
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
