"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

import {
    ParseTree,
    ParseTreeStats,
    ParsePostResponse,
} from "spell-spells-schema";

import PosTable from "@/components/board/pos-table/PosTable";
import SpellBook from "@/components/board/spellBook/SpellBook";
import PlayerCast from "@/components/board/floor/PlayerCast";
import { CastBox } from "@/components/board/CastBox";
import CastFloor from "@/components/board/floor/CastFloor";
import HealthOrb from "@/components/board/HealthOrb";
import UsedWords from "@/components/board/UsedWords";
import ConstituencyTreeLeaf from "@/components/board/tree/ConstituencyTree";
import LetterBank from "@/components/board/LetterBank";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import {
    newSpellSlotA,
    newSpellSlotB,
    newSpellSlotC,
    newSpellSlotD,
} from "@/state/slices/playerCasts/playerCastsSlice";
import { flipTurn } from "@/state/slices/player/playerSlice";

export default function Home() {
    const hasMounted = useRef(false);
    const router = useRouter();

    const dispatch = useAppDispatch();

    const { player1, myTurn } = useAppSelector((state) => state.player.value);
    const sentence = useAppSelector((state) => state.sentence.value);

    const { p1Health, p2Health } = useAppSelector(
        (state) => state.playerHealths.value
    );
    const { slotA, slotB, slotC, slotD } = useAppSelector(
        (state) => state.playerCasts.value
    );

    const [tree, setTree] = useState<ParseTree>({ None: "None" });
    const [posTable, setPosTable] = useState<ParseTreeStats | null>(null);

    /*
    // on first load
    useEffect(() => {
        socket.on("gameStart", () => {
            // do stuff on gameStart action
        });
    }, []);
    */

    // on sentence change
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
        if (sentence === "Type a sentence to cast a spell.") {
            return;
        }
        socket.emit("sentenceSubmit", { sentence: sentence });
    }, [sentence]);

    // defining what takes place on sentenceSubmit and opponentDisconnect
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
        const onSentenceSubmitResponse = ({
            parseTreeStats,
            parseTree,
            playerCast,
            playerCastLocation,
        }: ParsePostResponse) => {
            console.log("Obtained a response from the server.");
            setPosTable(parseTreeStats);
            setTree(parseTree);

            if (playerCastLocation === "A") {
                dispatch(newSpellSlotA(playerCast));
            } else if (playerCastLocation === "B") {
                dispatch(newSpellSlotB(playerCast));
            } else if (playerCastLocation === "C") {
                dispatch(newSpellSlotC(playerCast));
            } else if (playerCastLocation === "D") {
                dispatch(newSpellSlotD(playerCast));
            }

            dispatch(flipTurn());
        };
        socket.on("sentenceSubmitResponse", onSentenceSubmitResponse);
        socket.on("opponentDisconnect", () => {
            dispatch({ type: "RESET" });
            router.push("/waiting");
        });
        return () => {
            socket.off("sentenceSubmitResponse", onSentenceSubmitResponse);
        };
    }, [dispatch, router]);

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
                        <div className={`flex min-h-[100px]`}>
                            <SpellBook />
                            <PosTable
                                className={`min-h-[100px] flex-1`}
                                stats={posTable}
                            ></PosTable>
                        </div>
                        <UsedWords className={`min-h-[100px]`} />
                        <LetterBank className={`min-h-[100px]`} />
                    </div>
                    <div
                        id="col2"
                        className={`col-span-8 grid grid-rows-[1fr_7fr_1fr] min-h-[750px]`}
                    >
                        <div>{sentence}</div>
                        <CastFloor
                            className={`border min-h-[100px]`}
                            rowReverse={!player1}
                        >
                            <PlayerCast
                                className=""
                                playerCast={slotA}
                            ></PlayerCast>
                            <PlayerCast
                                className=""
                                playerCast={slotB}
                            ></PlayerCast>
                            <PlayerCast
                                className=""
                                playerCast={slotC}
                            ></PlayerCast>
                            <PlayerCast
                                className=""
                                playerCast={slotD}
                            ></PlayerCast>
                        </CastFloor>
                        <CastBox className={`min-h-[100px]`} />
                    </div>
                    <div
                        id="col3"
                        className={`col-span-4 grid grid-rows-[1fr_7fr_1fr] min-h-[750px]`}
                    >
                        {/* THEIR health */}
                        <HealthOrb
                            className={!myTurn ? "bg-green-400" : ""}
                            health={player1 ? p2Health : p1Health}
                        />
                        <ConstituencyTreeLeaf pt={tree} />
                        {/* MY health */}
                        <HealthOrb
                            className={myTurn ? "bg-green-400" : ""}
                            health={player1 ? p1Health : p2Health}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
