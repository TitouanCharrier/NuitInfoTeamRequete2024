import Gametcha from "./gametcha.js";
import * as attacks_json from "../assets/gametcha/attacks.json"
import * as pokemons_json from "../assets/gametcha/pokemon.json"


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

let salameche: Pokemon = new Pokemon(pokemons_json.jsonPokemons.Salamèche);
let rattata: Pokemon = new Pokemon(pokemons_json.jsonPokemons.Rattata);
let flameche: Attack = new Attack(attacks_json.jsonAttacks.Flammèche);
let charge: Attack = new Attack(attacks_json.jsonAttacks.Charge);
let vive_attaque: Attack = new Attack(attacks_json.jsonAttacks["Vive-attaque"]);
let griffe: Attack = new Attack(attacks_json.jsonAttacks.Griffe);
let jet_de_sable: Attack = new Attack(attacks_json.jsonAttacks["Jet de sable"]);
let rugissement: Attack = new Attack(attacks_json.jsonAttacks.Rugissement);
let mini_queue: Attack = new Attack(attacks_json.jsonAttacks["Mimi-queue"]);

