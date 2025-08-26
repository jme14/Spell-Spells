import { NextResponse } from "next/server";
import parseTreeString, { printPrettyTree } from "@/utils/parseTreeString";
import { ParseTree } from "@/types/api/ParseTree";
import getParseTreeStats from "@/utils/getParseTreeStats";
import { ParsePostResponse } from "@/types/api/ParsePostResponse";
import getCastFromSentence from "@/utils/game/getCastFromSentence";
import PlayerUnlocks from "@/types/game/PlayerUnlocks";
export function getParseTreeFromData(data: {
    sentences: Array<{ parse: string }>;
}): ParseTree {
    const sentenceResponse = data.sentences[0];
    const sentence = sentenceResponse.parse.replaceAll("\n", " ");
    const parsedSentences = parseTreeString(sentence);

    return parsedSentences;
}
export async function POST(req: Request) {
    const { text } = await req.json();

    const res = await fetch(
        `http://localhost:9000/?properties=${encodeURIComponent(
            JSON.stringify({
                annotators: "tokenize,ssplit,pos,parse",
                outputFormat: "json",
            })
        )}`,
        {
            method: "POST",
            body: text,
            headers: { "Content-Type": "text/plain" },
        }
    );

    const data = await res.json();
    const pt = getParseTreeFromData(data);
    const cParse = printPrettyTree(pt);
    const ptStats = getParseTreeStats(pt);
    const spellKey = {
        ptStats: ptStats,
        cParse: cParse,
        unlocks: new PlayerUnlocks(),
    };
    const playerCast = getCastFromSentence(spellKey);

    const postResponse: ParsePostResponse = {
        parseTree: pt,
        constituencyParse: printPrettyTree(pt),
        parseTreeStats: ptStats,
        playerCast: playerCast,
    };
    return NextResponse.json(postResponse);
}
