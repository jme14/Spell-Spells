export const SYNTAX_TAGS = [
    "ADJP", // Adjective Phrase
    "ADVP", // Adverb Phrase
    "CONJP", // Conjunction Phrase
    "FRAG", // Fragment
    "INTJ", // Interjection
    "LST", // List marker
    "NAC", // Not A Constituent
    "NP", // Noun Phrase
    "NX", // Used within NP for complex NPs
    "PP", // Prepositional Phrase
    "PRN", // Parenthetical
    "PRT", // Particle
    "QP", // Quantifier Phrase
    "RRC", // Reduced Relative Clause
    "S", // Simple Declarative Clause
    "SBAR", // Subordinate Clause
    "SBARQ", // Direct Question introduced by wh-word/phrase
    "SINV", // Inverted Declarative Sentence
    "SQ", // Inverted Yes/No Question
    "UCP", // Unlike Coordinated Phrase
    "VP", // Verb Phrase
    "WHADJP", // Wh-adjective Phrase
    "WHADVP", // Wh-adverb Phrase
    "WHNP", // Wh-noun Phrase
    "WHPP", // Wh-prepositional Phrase
    "X", // Unknown / miscellaneous
];

export type SyntaxTag = (typeof SYNTAX_TAGS)[number];
