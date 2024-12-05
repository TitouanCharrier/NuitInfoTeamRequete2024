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
let salameche = new Pokemon("");
export {};
