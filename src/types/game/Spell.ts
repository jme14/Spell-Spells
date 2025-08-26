import { School } from "./School";
interface SpellInterface {
    attack: number;
    block: number;
    school: School;
}
export default class Spell {
    attack: number;
    block: number;
    school: School;

    constructor({ attack, block, school }: SpellInterface) {
        this.attack = attack;
        this.block = block;
        this.school = school;
    }
}
