import { PosTag } from "./PosTag";
import forEachTag from "@/utils/forEachTag";
import { SyntaxTag } from "./SyntaxTag";
import { PosGeneral } from "./PosGeneral";
import { POS_TO_POS_GENERAL } from "./PosToPosGeneralMap";
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
            this.posTags = {} as Record<PosTag, TagStats>;
            forEachTag(PosTag, (tag) => {
                this.posTags[tag] = new TagStats();
            });

            this.syntaxTags = {} as Record<SyntaxTag, TagStats>;
            forEachTag(SyntaxTag, (tag) => {
                this.syntaxTags[tag] = new TagStats();
            });

            this.posGeneralTags = {} as Record<PosGeneral, TagStats>;
            forEachTag(PosGeneral, (tag) => {
                this.posGeneralTags[tag] = new TagStats();
            });

            return;
        }
        this.posTags = posTags;
        this.syntaxTags = syntaxTags;
        this.posGeneralTags = posGeneralTags;
    }

    toString(): string {
        const strArray = [];
        strArray.push(`Syntax Tags`);
        forEachTag(SyntaxTag, (tag) => {
            if (this.syntaxTags[tag].amount !== 0) {
                strArray.push(`${tag}: ${this.syntaxTags[tag]}`);
            }
        });
        strArray.push(`Part of Speech Tags`);
        forEachTag(PosTag, (tag) => {
            if (this.posTags[tag].amount !== 0) {
                strArray.push(`${tag}: ${this.posTags[tag]}`);
            }
        });
        strArray.push(`General Part of Speech Tags`);
        forEachTag(PosGeneral, (tag) => {
            if (this.posGeneralTags[tag].amount !== 0) {
                strArray.push(`${tag}: ${this.posGeneralTags[tag]}`);
            }
        });
        return strArray.join("\n");
    }

    incrementPosTag(tag: PosTag, n: number) {
        for (let i = 0; i < n; i++) {
            this.posTags[tag].increment();
            const generalTag = POS_TO_POS_GENERAL[tag];
            this.posGeneralTags[generalTag].increment();
        }
    }
    incrementSyntaxTag(tag: SyntaxTag, n: number) {
        for (let i = 0; i < n; i++) {
            this.syntaxTags[tag].increment();
        }
    }
    increment(tag: PosTag | SyntaxTag, n?: number) {
        // WARNING: DO NOT REMOVE THIS -- YOU NEED THIS BC IF n = 0 IT WILL TURN TO 1
        if (n === 0) return;
        n = n || 1;
        if (tag in PosTag) {
            this.incrementPosTag(tag as PosTag, n);
        } else if (tag in SyntaxTag) {
            this.incrementSyntaxTag(tag as SyntaxTag, n);
        } else {
            console.log(tag);
            throw new Error("ERROR: Invalid Tag Incremented");
        }
    }

    combine(ptStats: ParseTreeStats) {
        forEachTag(PosTag, (tag) => {
            this.increment(tag, ptStats.posTags[tag].amount);
        });
        forEachTag(SyntaxTag, (tag) => {
            this.increment(tag, ptStats.syntaxTags[tag].amount);
        });
    }

    getPosGeneralCountsMap(): Record<PosGeneral, number> {
        const posGeneralCounts: Record<PosGeneral, number> = {} as Record<
            PosGeneral,
            number
        >;
        forEachTag(PosGeneral, (tag) => {
            posGeneralCounts[tag] = this.posGeneralTags[tag].amount;
        });
        return posGeneralCounts;
    }
}
