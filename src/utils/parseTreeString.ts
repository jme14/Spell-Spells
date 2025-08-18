import { ParseTree } from "@/types/ParseTree";

export function getTag(treeString: string): string {
    const match = treeString.match(/\(([^ ]*)/);
    const tag: string = match ? match[1] : "ERROR";

    if (tag === "ERROR") {
        throw new Error("Error obtaining tag.");
    }
    return tag;
}
export function getInnerStrings(treeString: string): Array<string> {
    let deepness = 0;
    let startCapture = -1;

    const innerStrings = [];
    for (let i = 1; i < treeString.length - 1; i++) {
        const char = treeString[i];
        if (char === "(") {
            deepness += 1;
            if (deepness === 1) {
                startCapture = i;
            }
        } else if (char === ")") {
            if (deepness === 1 && startCapture >= 0) {
                innerStrings.push(treeString.substring(startCapture, i + 1));
                startCapture = -1;
            }
            deepness -= 1;
        }
    }
    return innerStrings;
}

export function getObject(treeString: string): ParseTree {
    const returnDict: ParseTree = {};

    const tag = getTag(treeString);

    const parenCount = (treeString.match(/\)/g) || []).length;

    // if only 1 paren remains
    if (parenCount === 1) {
        const wordMatch = treeString.match(/([^ \)\(]*)\)/);
        const word = wordMatch ? wordMatch[1] : "ERROR";

        returnDict[tag] = `"${word}"`;
        return returnDict;
    }

    const innerStrings: Array<string> = getInnerStrings(treeString);
    const innerStringObjectArray: Array<ParseTree> = innerStrings.map((str) =>
        getObject(str)
    );
    returnDict[tag] = innerStringObjectArray;
    return returnDict;
}

export function printPrettyTree(tree: ParseTree) {
    const returnArray = [];
    for (const key in tree) {
        const children = tree[key];

        if (typeof children === "string") {
            returnArray.push();
            returnArray.push(`${key} -> ${children}`);
            continue;
        }
        // if more ParseTrees further inward
        const childStrings = children.map((child) =>
            Object.keys(child).join(" ")
        );
        returnArray.push(`${key} -> ${childStrings.join(" ")}`);

        children.forEach((child) => {
            returnArray.push(printPrettyTree(child as ParseTree));
        });
    }
    const flattened = returnArray.flat();
    return flattened.sort((a: string, b: string) => {
        const aQuote = a.includes('"');
        const bQuote = b.includes('"');
        return bQuote && !aQuote // if a has a quotation or neither do, b is bigger
            ? -1
            : 1;
    });
}

export default function parseTreeString(treeString: string): ParseTree {
    const treeStringFormatted = treeString
        .split("\n")
        .join("")
        .replaceAll(/[ ]+/g, " ");
    //
    const object = getObject(treeStringFormatted);
    return object;
}
