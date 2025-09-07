import { School } from "spell-spells-schema";
export function schoolToDescription(school: string) {
    if (school === School.Death) {
    }

    switch (school) {
        case School.Death:
            return "0 NOUN, 1 ADJ, 0 VERB, 1 ADV";
        case School.Life:
            return "1 NOUN, 1 ADJ, 1 VERB, 1 ADV";
        case School.Ice:
            return "1 NOUN, 1+ ADJ, 1+ VERB, 0 ADV";
        case School.Fire:
            return "0 NOUN, 0 ADJ, VERB=ADV";
        case School.None:
            return "1 NOUN, 0 ADJ, 1 VERB, 0 ADV";
    }
}
