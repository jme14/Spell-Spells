export const POS_GENERAL = [
    // mains
    "Noun",
    "Adjective",
    "Verb",
    "Adverb",
    "Determiner",
    "Conjunction",

    // special
    "Number",
    "Existential",
    "Modal",
    "Possessive",
    "Particle",
    "Infinitive",
    "Interjection",

    "Invalid", //foreign maps to this, for example
];

export type PosGeneral = (typeof POS_GENERAL)[number];
