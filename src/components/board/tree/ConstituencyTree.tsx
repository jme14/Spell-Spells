import VerticalText from "@/components/general/VerticalText";
import { ParseTree } from "spell-spells-schema";
interface ConstituencyTreeLeafProps {
    pt: ParseTree;
}

export default function ConstituencyTreeLeaf({
    pt,
}: ConstituencyTreeLeafProps) {
    const leftTag = Object.keys(pt);

    if (leftTag.length > 1) {
        throw new Error("Invalid parse tree.");
    }

    // this could easily break
    if (leftTag[0] === "ROOT") {
        const realTree = Object.values(pt)[0][0] as ParseTree;
        return <ConstituencyTreeLeaf pt={realTree}></ConstituencyTreeLeaf>;
    }

    const rightTrees = Object.values(pt)[0];
    if (typeof rightTrees === "string") {
        const rightWord = rightTrees
            .split("")
            .filter((char) => char !== `"`)
            .join("");

        return (
            <div className="flex flex-1 justify-around ">
                <VerticalText className="border" text={leftTag[0]} />
                <div className="flex flex-1 justify-evenly items-center border">
                    {rightWord}
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-1 `}>
            <VerticalText className="border" text={leftTag[0]} />
            <div className={`flex flex-col justify-center w-full border`}>
                {rightTrees.map((tree, index) => (
                    <ConstituencyTreeLeaf key={index} pt={tree} />
                ))}
            </div>
        </div>
    );
}
