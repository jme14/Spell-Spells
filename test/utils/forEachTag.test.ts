import { describe, it, expect } from "vitest";
import { SyntaxTag } from "@/types/nlp/SyntaxTag";
import forEachTag from "@/utils/forEachTag";

describe("forEachTag", () => {
    it("works", () => {
        forEachTag(SyntaxTag, (tag) => {
            console.log(tag);
            console.log(SyntaxTag[tag]);
        });
        expect("NP" in SyntaxTag).toBeTruthy();
        expect("Clipse" in SyntaxTag).toBeFalsy();
        console.log(SyntaxTag["NP"]);
    });
});
