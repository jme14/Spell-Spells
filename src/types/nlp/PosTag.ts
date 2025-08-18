// Penn Treebank POS Tags
export const POS_TAGS = [
    "CC", // Coordinating conjunction
    "CD", // Cardinal number
    "DT", // Determiner
    "EX", // Existential there
    "FW", // Foreign word
    "IN", // Preposition / subordinating conjunction
    "JJ", // Adjective
    "JJR", // Adjective, comparative
    "JJS", // Adjective, superlative
    "LS", // List item marker
    "MD", // Modal
    "NN", // Noun, singular or mass
    "NNS", // Noun, plural
    "NNP", // Proper noun, singular
    "NNPS", // Proper noun, plural
    "PDT", // Predeterminer
    "POS", // Possessive ending
    "PRP", // Personal pronoun
    "PRP$", // Possessive pronoun
    "RB", // Adverb
    "RBR", // Adverb, comparative
    "RBS", // Adverb, superlative
    "RP", // Particle
    "SYM", // Symbol
    "TO", // "to"
    "UH", // Interjection
    "VB", // Verb, base form
    "VBD", // Verb, past tense
    "VBG", // Verb, gerund/present participle
    "VBN", // Verb, past participle
    "VBP", // Verb, non-3rd person singular present
    "VBZ", // Verb, 3rd person singular present
    "WDT", // Wh-determiner
    "WP", // Wh-pronoun
    "WP$", // Possessive wh-pronoun
    "WRB", // Wh-adverb
];

export type PosTag = (typeof POS_TAGS)[number];
