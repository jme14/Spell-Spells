"use client";
import { useState } from "react";
import { ParsePostResponse } from "@/types/ParsePostResponse";
import ParseTreeStats from "@/types/ParseTreeStats";

export default function Home() {
    const defaultParse: ParsePostResponse = {
        parseTree: {},
        constituencyParse: ["This is where the tree will show up!"],
        parseTreeStats: new ParseTreeStats(),
    };
    const [value, setValue] = useState("");

    const [tree, setTree] = useState(defaultParse);

    async function onEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            const res = await fetch("/api/parse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: value }),
            });
            const data = await res.json();
            console.log(data);
            const arr = JSON.stringify(data);
            setTree(data);
        }
    }
    return (
        <div className="pt-80 flex-col text-center">
            <h1>This is where you type!</h1>
            <input
                className="border max-h-30 min-h-30 max-w-3/5 min-w-3/5"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onEnter}
            ></input>
            {tree.constituencyParse.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    );
}
