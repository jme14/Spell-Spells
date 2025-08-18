import { PosTag, POS_TAGS } from "./nlp/PosTag";
import { SyntaxTag, SYNTAX_TAGS } from "./nlp/SyntaxTag";
import { PosGeneral, POS_GENERAL } from "./nlp/PosGeneral";
import { POS_TO_POS_GENERAL } from "./nlp/PosToPosGeneralMap";
import TagStats from "./TagStats";

export default class ParseTreeStats {
    posTags: Record<PosTag, TagStats>;
    syntaxTags: Record<SyntaxTag, TagStats>;
    posGeneralTags: Record<PosGeneral, TagStats>;

    constructor(
        posTags?: Record<PosTag, TagStats>,
        syntaxTags?: Record<SyntaxTag, TagStats>,
        posGeneralTags?: Record<PosGeneral, TagStats>
    ) {
        if (!posTags || !syntaxTags || !posGeneralTags) {
            this.posTags = {};
            for (const tag of POS_TAGS) {
                this.posTags[tag] = new TagStats();
            }

            this.syntaxTags = {};
            for (const tag of SYNTAX_TAGS) {
                this.syntaxTags[tag] = new TagStats();
            }

            this.posGeneralTags = {};
            for (const tag of POS_GENERAL) {
                this.posGeneralTags[tag] = new TagStats();
            }

            return;
        }
        this.posTags = posTags;
        this.syntaxTags = syntaxTags;
        this.posGeneralTags = posGeneralTags;
    }

    toString(): string {
        const strArray = [];
        strArray.push(`Syntax Tags`);
        for (const tag in this.syntaxTags) {
            if (this.syntaxTags[tag].amount !== 0) {
                strArray.push(`${tag}: ${this.syntaxTags[tag]}`);
            }
        }
        strArray.push(`Part of Speech Tags`);
        for (const tag in this.posTags) {
            if (this.posTags[tag].amount !== 0) {
                strArray.push(`${tag}: ${this.posTags[tag]}`);
            }
        }
        strArray.push(`General Part of Speech Tags`);
        for (const tag in this.posGeneralTags) {
            if (this.posGeneralTags[tag].amount !== 0) {
                strArray.push(`${tag}: ${this.posGeneralTags[tag]}`);
            }
        }
        return strArray.join("\n");
    }

    increment(tag: string, n?: number) {
        if (n === 0) return;
        n = n || 1;
        if (POS_TAGS.includes(tag)) {
            for (let i = 0; i < n; i++) {
                this.posTags[tag].increment();
                const generalTag = POS_TO_POS_GENERAL[tag];
                this.posGeneralTags[generalTag].increment();
            }
        } else if (SYNTAX_TAGS.includes(tag)) {
            for (let i = 0; i < n; i++) {
                this.syntaxTags[tag].increment();
            }
        }
    }

    combine(ptStats: ParseTreeStats) {
        for (const tag in ptStats.posTags) {
            this.increment(tag, ptStats.posTags[tag].amount);
        }
        for (const tag in ptStats.syntaxTags) {
            this.increment(tag, ptStats.syntaxTags[tag].amount);
        }
    }
}
