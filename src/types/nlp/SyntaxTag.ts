export function forEachSyntaxTag(func: (tag: SyntaxTag) => void) {
    Object.values(SyntaxTag)
        .filter((tag) => typeof tag === "number")
        .forEach((tag) => func(tag));
}

export enum SyntaxTag {
    // Phrase-level tags
    ADJP = "ADJP", // Adjective Phrase
    ADVP = "ADVP", // Adverb Phrase
    CONJP = "CONJP", // Conjunction Phrase
    NAC = "NAC", // Not A Constituent
    NP = "NP", // Noun Phrase
    PP = "PP", // Prepositional Phrase
    PRT = "PRT", // Particle
    QP = "QP", // Quantifier Phrase
    RRC = "RRC", // Reduced Relative Clause
    UCP = "UCP", // Unlike Coordinated Phrase
    VP = "VP", // Verb Phrase
    WHADJP = "WHADJP", // Wh-adjective Phrase
    WHADVP = "WHADVP", // Wh-adverb Phrase
    WHNP = "WHNP", // Wh-noun Phrase
    WHPP = "WHPP", // Wh-prepositional Phrase

    // Clause-level tags
    S = "S", // Simple Declarative Clause
    SBAR = "SBAR", // Subordinate Clause
    SBARQ = "SBARQ", // Direct Question introduced by wh-word/phrase
    SINV = "SINV", // Inverted Declarative Sentence
    SQ = "SQ", // Inverted Yes/No Question

    // NP-internal / minor phrase tags
    NX = "NX", // Noun Phrase internal structure
    NML = "NML", // Nominal Modifier
    PRN = "PRN", // Parenthetical inside phrases
    LST = "LST", // List marker in NPs
    FRAG = "FRAG", // Fragment inside phrases

    // Misc / rare
    INTJ = "INTJ", // Interjection as standalone
    X = "X", // Unknown / miscellaneous elements
}
