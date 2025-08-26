import { describe, expect, it } from "vitest";
import { School } from "@/types/game/School";
import { ParsePostResponse } from "@/types/api/ParsePostResponse";
import ParseTreeStats from "@/types/nlp/ParseTreeStats";
import getCastFromSentence, {
    getAttack,
} from "@/utils/game/getCastFromSentence";
import PlayerUnlocks from "@/types/game/PlayerUnlocks";
import Spell from "@/types/game/Spell";
import { PosGeneral } from "@/types/nlp/PosGeneral";

describe.skip("getCastFromSentence api calls", () => {
    it("complete flow works", async () => {
        const sentence = "The dog jumped.";
        const res = await fetch("http://localhost:3000/api/parse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: sentence }),
        });

        const data: ParsePostResponse = await res.json();
        expect(data).toBeTruthy();
        const ptStatsObject = data.parseTreeStats;
        const ptStats = new ParseTreeStats(
            ptStatsObject.posTags,
            ptStatsObject.syntaxTags,
            ptStatsObject.posGeneralTags
        );
        console.log(ptStats);
        const posGenCounts = ptStats.getPosGeneralCountsMap();
        const expectPosGenCounts: Record<PosGeneral, number> = {
            Noun: 1,
            Adjective: 0,
            Adverb: 0,
            Verb: 1,
            Determiner: 1,
            Conjunction: 1,
            Number: 0,
            Existential: 0,
            Modal: 0,
            Possessive: 0,
            Particle: 0,
            Infinitive: 0,
            Interjection: 0,

            Invalid: 0, //foreign maps to this, for example
        };
        expect(posGenCounts).toMatchObject(expectPosGenCounts);

        const sKey = {
            ptStats: ptStats,
            cParse: data.constituencyParse,
            unlocks: new PlayerUnlocks(),
        };
        const spell = getCastFromSentence(sKey);
        expect(spell).toStrictEqual(
            new Spell({ attack: 1, block: 1, school: School.None })
        );
    });
});

describe("attack and block", () => {
    it("attack works", async () => {
        const sentence = "The big blue dog with a perm jumped.";
        const res = await fetch("http://localhost:3000/api/parse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: sentence }),
        });

        const data: ParsePostResponse = await res.json();
        expect(data).toBeTruthy();
        /*
        const ptStatsObject = data.parseTreeStats;
        const ptStats = new ParseTreeStats(
            ptStatsObject.posTags,
            ptStatsObject.syntaxTags,
            ptStatsObject.posGeneralTags
        );
        */
        const cParse = data.constituencyParse;
        expect(getAttack(cParse)).toBe(1);
    });
});
