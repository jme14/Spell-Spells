import ParseTreeStats from "../nlp/ParseTreeStats";
import PlayerUnlocks from "./PlayerUnlocks";

export type SpellbookKey = {
    ptStats: ParseTreeStats;
    cParse: string[];
    unlocks: PlayerUnlocks;
};
