import { ParseTree } from "@/types/api/ParseTree";
import ParseTreeStats from "@/types/nlp/ParseTreeStats";
import { PosTag } from "@/types/nlp/PosTag";
import { SyntaxTag } from "@/types/nlp/SyntaxTag";

export default function getParseTreeStats(pt: ParseTree): ParseTreeStats {
    const ptStats = new ParseTreeStats();

    for (const tag in pt) {
        if (tag in PosTag || tag in SyntaxTag) {
            ptStats.increment(tag as PosTag | SyntaxTag);
        }
        const child = pt[tag as PosTag | SyntaxTag];

        if (typeof child === "string") {
            continue;
        }
        const innerPtStats = child.map((innerPt) => getParseTreeStats(innerPt));
        innerPtStats.forEach((innerPtStats) => ptStats.combine(innerPtStats));
    }

    return ptStats;
}
