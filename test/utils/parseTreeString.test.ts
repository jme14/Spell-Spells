import { describe, expect, it } from "vitest";

import parseTreeString from "@/utils/parseTreeString";
import { getInnerStrings } from "@/utils/parseTreeString";
describe("parseTreeString", () => {
    it("innerString works", () => {
        const testString =
            "(ROOT (S (NP (DT The) (JJ big) (NN boy)) (VP (VBD cried)) (. .)))";
        const rootResult = getInnerStrings(testString);
        expect(rootResult).toStrictEqual([
            "(S (NP (DT The) (JJ big) (NN boy)) (VP (VBD cried)) (. .))",
        ]);
        const innerResult = getInnerStrings(rootResult[0]);
        expect(innerResult).toStrictEqual([
            "(NP (DT The) (JJ big) (NN boy))",
            "(VP (VBD cried))",
            "(. .)",
        ]);
    });
    it("blanket", () => {
        const testString = `(ROOT
  (SBARQ
    (WHNP (WP What))
    (SQ (VBZ does)
      (NP (DT this))
      (VP (VB do)
        (PP (IN for)
          (NP (NN example)))))))`;
        const result = parseTreeString(testString);
        expect(result).toBeTruthy();
    });
});
