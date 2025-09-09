import { RootState } from "@/state/store";

import { createSelector } from "@reduxjs/toolkit";

const selectSentence = (state: RootState) => state.sentence;
const selectPlayerCasts = (state: RootState) => state.playerCasts;
const selectPlayerHealths = (state: RootState) => state.playerHealths;
const selectUsedWords = (state: RootState) => state.usedWords;
const selectLetterBank = (state: RootState) => state.letterBank;
const selectPlayer = (state: RootState) => state.player;

export const selectGameState = createSelector(
    [
        selectSentence,
        selectPlayerCasts,
        selectPlayerHealths,
        selectUsedWords,
        selectLetterBank,
        selectPlayer,
    ],
    (sentence, playerCasts, playerHealths, usedWords, letterBank, player) => {
        return {
            sentence: sentence,
            playerCasts: playerCasts,
            playerHealths: playerHealths,
            usedWords: usedWords,
            letterBank: letterBank,
            player: player,
        };
    }
);
