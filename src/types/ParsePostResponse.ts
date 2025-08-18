import { ParseTree } from "./ParseTree";
import ParseTreeStats from "./ParseTreeStats";
export interface ParsePostResponse {
    parseTree: ParseTree;
    constituencyParse: string[];
    parseTreeStats: ParseTreeStats;
}
