import { useEffect } from "react";

import { getSocket } from "@/lib/socket";
import { useAppSelector } from "@/hooks/hooks";
import { selectGameState } from "@/state/selectors/selectGameState";
import { GameStateClient } from "spell-spells-schema";

export function useSubmitSentence() {
    const { sentenceSent, sentenceRecieved } = useAppSelector(
        (state) => state.sentence
    );
    const gameState = useAppSelector(selectGameState);

    useEffect(() => {
        // nothing has happened; don't send a message
        if (sentenceSent === sentenceRecieved) {
            console.log("SentenceSent | Last Submitted");
            console.log(
                `Sentence Sent: ${sentenceSent} | Sentence Recieved: ${sentenceRecieved}`
            );
            console.log("I guess I'm returnnng");
            return;
        }

        const gameStateMessage: GameStateClient = {
            sentenceSubmission: sentenceSent,
            playerOneHealth: gameState.playerHealths.value.p1Health,
            playerTwoHealth: gameState.playerHealths.value.p2Health,
            usedWords: gameState.usedWords.value,
            letterBank: gameState.letterBank.value,
        };
        const socket = getSocket();
        socket.emit("sentenceSubmit", gameStateMessage);

        // console.log("I should have just emitted an event...");
    }, [sentenceSent, sentenceRecieved, gameState]);
}
