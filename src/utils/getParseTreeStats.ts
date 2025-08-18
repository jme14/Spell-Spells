import { ParseTree } from "@/types/ParseTree";
import ParseTreeStats from "@/types/ParseTreeStats";

export default function getParseTreeStats(pt: ParseTree): ParseTreeStats {
    const ptStats = new ParseTreeStats();

    for (const tag in pt) {
        ptStats.increment(tag);

        const child = pt[tag];

        if (typeof child === "string") {
            continue;
        }
        const innerPtStats = child.map((innerPt) => getParseTreeStats(innerPt));
        innerPtStats.forEach((innerPtStats) => ptStats.combine(innerPtStats));
    }

    return ptStats;
}
