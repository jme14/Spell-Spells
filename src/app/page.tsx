"use client";
import { useState } from "react";
import Spell from "@/types/game/Spell";

import PosTable from "@/components/PosTable";
import PlayerCast from "@/components/PlayerCast";

export default function Home() {
    const [value, setValue] = useState("");

    const [tree, setTree] = useState(["The tree appears here!"]);
    const [posTable, setPosTable] = useState(null);
    const [playerCast, setPlayerCast] = useState<Spell | null>(null);

    async function onEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            const res = await fetch("/api/parse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: value }),
            });
            const data = await res.json();
            setPosTable(data.parseTreeStats);
            setTree(data.constituencyParse);
            setPlayerCast(data.playerCast);
        }
    }
    return (
        <div className="pt-60 flex-col text-center">
            <h1>This is where you type!</h1>
            <input
                className="border max-h-30 min-h-30 max-w-3/5 min-w-3/5"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onEnter}
            ></input>
            <div className="flex justify-evenly items-center text-center pt-3">
                <div className="w-2/10 ">
                    <PlayerCast playerCast={playerCast}></PlayerCast>
                </div>
                <div className="flex-col ">
                    {tree.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
                <div className="">
                    <PosTable stats={posTable}></PosTable>
                </div>
            </div>
        </div>
    );
}
