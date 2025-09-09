import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import {
    ParseTree,
    ParseTreeStats,
    GameStateServer,
} from "spell-spells-schema";

import { getSocket } from "@/lib/socket";
import { useAppDispatch } from "@/hooks/hooks";
import {
    newSpellSlotA,
    newSpellSlotB,
    newSpellSlotC,
    newSpellSlotD,
} from "@/state/slices/playerCasts/playerCastsSlice";
import { recieveSentence } from "@/state/slices/sentence/sentenceSlice";
import { flipTurn } from "@/state/slices/player/playerSlice";

export function useOnSentenceSubmit() {
    const hasMounted = useRef(false);
    const { push } = useRouter();

    const dispatch = useAppDispatch();

    const [tree, setTree] = useState<ParseTree>({ None: "None" });
    const [posTable, setPosTable] = useState<ParseTreeStats | null>(null);

    // defining what takes place on sentenceSubmit and opponentDisconnect
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
        const onSentenceSubmitResponse = ({
            // for updating UI
            parseTree,
            parseTreeStats,

            // for updating state
            lastSentence,
            playerCast,
        }: /*
            playerCast: PlayerCast;
            playerOneHealth: number;
            playerTwoHealth: number;
            usedWords: string[];
            letterBank: string[];
            */
        GameStateServer) => {
            setPosTable(parseTreeStats);
            setTree(parseTree);

            // updatingSentence happens here
            dispatch(recieveSentence(lastSentence));

            // updating playerCast state
            const { playerSpell, playerCastLocation } = playerCast;
            if (playerCastLocation === "A") {
                dispatch(newSpellSlotA(playerSpell));
            } else if (playerCastLocation === "B") {
                dispatch(newSpellSlotB(playerSpell));
            } else if (playerCastLocation === "C") {
                dispatch(newSpellSlotC(playerSpell));
            } else if (playerCastLocation === "D") {
                dispatch(newSpellSlotD(playerSpell));
            }

            // changing turn
            dispatch(flipTurn());
        };
        const onOpponentDisconnect = () => {
            dispatch({ type: "RESET" });
            push("/waiting");
        };
        const socket = getSocket();
        socket.on("sentenceSubmitResponse", onSentenceSubmitResponse);
        socket.on("opponentDisconnect", onOpponentDisconnect);
        return () => {
            socket.off("sentenceSubmitResponse", onSentenceSubmitResponse);
            socket.off("opponentDisconnect", onOpponentDisconnect);
        };
    }, [dispatch, push]);

    return { tree, posTable };
}
