"use client";
import PosTable from "@/components/board/pos-table/PosTable";
import SpellBook from "@/components/board/spellBook/SpellBook";
import PlayerCast from "@/components/board/floor/PlayerCast";
import { CastBox } from "@/components/board/CastBox";
import CastFloor from "@/components/board/floor/CastFloor";
import HealthOrb from "@/components/board/HealthOrb";
import UsedWords from "@/components/board/UsedWords";
import ConstituencyTreeLeaf from "@/components/board/tree/ConstituencyTree";
import LetterBank from "@/components/board/LetterBank";

import { useAppSelector } from "@/hooks/hooks";
import { useSubmitSentence } from "@/hooks/useSubmitSentence";
import { useOnSentenceSubmit } from "@/hooks/useOnSentenceSubmit";

export default function Home() {
    // from global state
    const { player1, myTurn } = useAppSelector((state) => state.player.value);
    const { sentenceRecieved } = useAppSelector((state) => state.sentence);

    const { p1Health, p2Health } = useAppSelector(
        (state) => state.playerHealths.value
    );
    const { slotA, slotB, slotC, slotD } = useAppSelector(
        (state) => state.playerCasts.value
    );

    // logic for how to handle recieving a new sentence submission
    const { tree, posTable } = useOnSentenceSubmit();
    // logic for what happens upon a sentence being submitted
    useSubmitSentence();

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
                        <div>{sentenceRecieved}</div>
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
