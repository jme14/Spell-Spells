"use client";
import { useState } from "react";
import Spell from "@/types/game/Spell";

import PosTable from "@/components/board/pos-table/PosTable";
import PlayerCast from "@/components/board/floor/PlayerCast";
import { CastBox } from "@/components/board/CastBox";
import CastFloor from "@/components/board/floor/CastFloor";
import HealthOrb from "@/components/board/HealthOrb";
import UsedWords from "@/components/board/UsedWords";
import ConstituencyTreeLeaf from "@/components/board/tree/ConstituencyTree";
import LetterBank from "@/components/board/LetterBank";

export default function Home() {
    const [sentence, setSentence] = useState("This is where you type!");
    const [tree, setTree] = useState({ None: "None" });
    const [posTable, setPosTable] = useState(null);
    const [playerCast, setPlayerCast] = useState<Spell | null>(null);

    async function onSentenceSubmit(sent: string) {
        setSentence(sent);
        const res = await fetch("/api/parse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: sent }),
        });
        const data = await res.json();
        setPosTable(data.parseTreeStats);
        setTree(data.parseTree);
        setPlayerCast(data.playerCast);
    }
    return (
        <div className={`flex justify-center items-center`}>
            <div className={`flex justify-center items-center w-3/4 pt-20`}>
                <div
                    className={`grid grid-cols-16 text-center  aspect-[16/9] w-full`}
                >
                    <div
                        id="col1"
                        className={`col-span-4 grid grid-rows-[5fr_2fr_2fr] min-h-[750px]`}
                    >
                        <PosTable
                            className={`min-h-[100px]`}
                            stats={posTable}
                        ></PosTable>
                        <UsedWords className={`min-h-[100px]`} />
                        <LetterBank className={`min-h-[100px]`} />
                    </div>
                    <div
                        id="col2"
                        className={`col-span-8 grid grid-rows-[1fr_7fr_1fr] min-h-[750px]`}
                    >
                        <div>{sentence}</div>
                        <CastFloor className={`border min-h-[100px]`}>
                            <PlayerCast
                                className=""
                                playerCast={playerCast}
                            ></PlayerCast>
                            <PlayerCast
                                className=""
                                playerCast={playerCast}
                            ></PlayerCast>
                            <PlayerCast
                                className=""
                                playerCast={playerCast}
                            ></PlayerCast>
                            <PlayerCast
                                className=""
                                playerCast={playerCast}
                            ></PlayerCast>
                        </CastFloor>
                        <CastBox
                            className={`min-h-[100px]`}
                            onSentenceSubmit={onSentenceSubmit}
                        />
                    </div>
                    <div
                        id="col3"
                        className={`col-span-4 grid grid-rows-[1fr_7fr_1fr] min-h-[750px]`}
                    >
                        <HealthOrb className={``} health={9} />
                        <ConstituencyTreeLeaf pt={tree} />
                        <HealthOrb className={``} health={9} />
                    </div>
                </div>
            </div>
        </div>
    );
}
