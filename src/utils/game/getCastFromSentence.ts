// where the mappings of content to spells is located
import { PosGeneral } from "../../types/nlp/PosGeneral";
import Spell from "../../types/game/Spell";
import Potion from "../../types/game/Potion";
import {
    School,
    isNone,
    isFire,
    isIce,
    isDeath,
    isLife,
    SchoolKey,
} from "@/types/game/School";
import { SpellbookKey } from "@/types/game/SpellbookKey";

// const SCHOOL_TYPES = ["Fire", "Ice", "Death", "Life", "None", "Fizzle"];
// type SchoolTypes = (typeof SCHOOL_TYPES)[number];

// assuming valid sentence structures
export function getSchool(posGenCountsMap: Record<PosGeneral, number>): School {
    const nounCount = posGenCountsMap[PosGeneral.Noun];
    const adjCount = posGenCountsMap[PosGeneral.Adjective];
    const verbCount = posGenCountsMap[PosGeneral.Verb];
    const advCount = posGenCountsMap[PosGeneral.Adverb];

    const schoolKey: SchoolKey = {
        nounCount: nounCount,
        adjCount: adjCount,
        verbCount: verbCount,
        advCount: advCount,
    };

    if (isLife(schoolKey)) {
        return School.Life;
    }
    if (isNone(schoolKey)) {
        return School.None;
    }
    if (isDeath(schoolKey)) {
        return School.Death;
    }
    if (isFire(schoolKey)) {
        return School.Fire;
    }
    if (isIce(schoolKey)) {
        return School.Ice;
    }

    return School.Fizzle;
}

export function getAttack(cParse: string[]): number {
    const vpRegex = /VP -> /;
    const verbPhrases = cParse.filter((str) => vpRegex.test(str));

    let attack = 0;
    // attack is the amount of words in verb phrases
    for (const verbPhrase of verbPhrases) {
        const rightTags = verbPhrase.split(vpRegex)[1];
        const rightTagCount = rightTags.split(" ").length;
        attack += rightTagCount;
    }

    return attack;
}
export function getBlock(cParse: string[]): number {
    const npRegex = /NP -> /;
    const nounPhrases = cParse.filter((str) => npRegex.test(str));

    let block = 0;

    // block is the amount of words in noun phrases
    for (const nounPhrase of nounPhrases) {
        const rightTags = nounPhrase.split(npRegex)[1];
        const rightTagCount = rightTags.split(" ").length;
        block += rightTagCount;
    }

    return block;
}

export default function getCastFromSentence({
    ptStats,
    cParse,
}: SpellbookKey): Spell | Potion | null {
    // get counts for each
    const posGenCountsMap: Record<PosGeneral, number> =
        ptStats.getPosGeneralCountsMap();

    const school: School = getSchool(posGenCountsMap);
    const attack = getAttack(cParse);
    const block = getBlock(cParse);

    if (school != School.Fizzle) {
        const spell = new Spell({
            school: school,
            attack: attack,
            block: block,
        });
        console.log(spell);
        return spell;
    } else {
        return new Potion();
    }
}
