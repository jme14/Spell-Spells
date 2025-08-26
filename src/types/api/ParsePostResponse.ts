import { ParseTree } from "./ParseTree";
import ParseTreeStats from "../nlp/ParseTreeStats";
import Spell from "../game/Spell";
import Potion from "../game/Potion";

export interface ParsePostResponse {
    parseTree: ParseTree;
    constituencyParse: string[];
    parseTreeStats: ParseTreeStats;
    playerCast: Spell | Potion | null;
}
