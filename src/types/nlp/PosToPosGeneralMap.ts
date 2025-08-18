import { PosTag } from "./PosTag";
import { PosGeneral } from "./PosGeneral";
export const POS_TO_POS_GENERAL: Record<PosTag, PosGeneral> = {
    // Nouns
    NN: "Noun",
    NNS: "Noun",
    NNP: "Noun",
    NNPS: "Noun",
    PRP: "Noun",
    PRP$: "Noun",
    WP: "Noun",
    WP$: "Noun",

    // Verbs
    VB: "Verb",
    VBD: "Verb",
    VBG: "Verb",
    VBN: "Verb",
    VBP: "Verb",
    VBZ: "Verb",

    // Adjectives
    JJ: "Adjective",
    JJR: "Adjective",
    JJS: "Adjective",

    // Adverbs
    RB: "Adverb",
    RBR: "Adverb",
    RBS: "Adverb",
    WRB: "Adverb",

    // Determiners
    DT: "Determiner",
    PDT: "Determiner",
    WDT: "Determiner",

    // Conjunctions
    CC: "Conjunction",
    IN: "Conjunction",

    // Others
    CD: "Number",
    EX: "Existential",
    MD: "Modal",
    POS: "Possessive",
    RP: "Particle",
    TO: "Infinitive",
    UH: "Interjection",

    SYM: "Invalid", // symbol
    FW: "Invalid", // foreign
    LS: "Invalid", // list item
};
