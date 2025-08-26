import { PosTag } from "./PosTag";
import { PosGeneral } from "./PosGeneral";
export const POS_TO_POS_GENERAL: Record<PosTag, PosGeneral> = {
    [PosTag.NN]: PosGeneral.Noun,
    [PosTag.NNS]: PosGeneral.Noun,
    [PosTag.NNP]: PosGeneral.Noun,
    [PosTag.NNPS]: PosGeneral.Noun,
    [PosTag.PRP]: PosGeneral.Noun,
    [PosTag.PRP$]: PosGeneral.Noun,
    [PosTag.WP]: PosGeneral.Noun,
    [PosTag.WP$]: PosGeneral.Noun,

    // Verbs
    [PosTag.VB]: PosGeneral.Verb,
    [PosTag.VBD]: PosGeneral.Verb,
    [PosTag.VBG]: PosGeneral.Verb,
    [PosTag.VBN]: PosGeneral.Verb,
    [PosTag.VBP]: PosGeneral.Verb,
    [PosTag.VBZ]: PosGeneral.Verb,

    // Adjectives
    [PosTag.JJ]: PosGeneral.Adjective,
    [PosTag.JJR]: PosGeneral.Adjective,
    [PosTag.JJS]: PosGeneral.Adjective,

    // Adverbs
    [PosTag.RB]: PosGeneral.Adverb,
    [PosTag.RBR]: PosGeneral.Adverb,
    [PosTag.RBS]: PosGeneral.Adverb,
    [PosTag.WRB]: PosGeneral.Adverb,

    // Determiners
    [PosTag.DT]: PosGeneral.Determiner,
    [PosTag.PDT]: PosGeneral.Determiner,
    [PosTag.WDT]: PosGeneral.Determiner,

    // Conjunctions
    [PosTag.CC]: PosGeneral.Conjunction,
    [PosTag.IN]: PosGeneral.Conjunction,

    // Others
    [PosTag.CD]: PosGeneral.Number,
    [PosTag.EX]: PosGeneral.Existential,
    [PosTag.MD]: PosGeneral.Modal,
    [PosTag.POS]: PosGeneral.Possessive,
    [PosTag.RP]: PosGeneral.Particle,
    [PosTag.TO]: PosGeneral.Infinitive,
    [PosTag.UH]: PosGeneral.Interjection,

    [PosTag.SYM]: PosGeneral.Invalid, // symbol
    [PosTag.FW]: PosGeneral.Invalid, // foreign
    [PosTag.LS]: PosGeneral.Invalid, // list item
};
