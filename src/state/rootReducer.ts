import { combineReducers, PayloadAction } from "@reduxjs/toolkit";
import sentenceReducer from "@/state/slices/sentence/sentenceSlice";
import playerCastsReducer from "@/state/slices/playerCasts/playerCastsSlice";
import playerHealthsReducer from "@/state/slices/playerHealths/playerHealthsSlice";
import playerReducer from "@/state/slices/player/playerSlice";
import letterBankReducer from "@/state/slices/letterBank/letterBankSlice";
import usedWordsReducer from "@/state/slices/usedWords/usedWordsSlice";

const appReducer = combineReducers({
    sentence: sentenceReducer,
    playerCasts: playerCastsReducer,
    playerHealths: playerHealthsReducer,
    player: playerReducer,
    letterBank: letterBankReducer,
    usedWords: usedWordsReducer,
});

export default function rootReducer(
    state: ReturnType<typeof appReducer> | undefined,
    action: PayloadAction<string>
) {
    if (action.type === "RESET") {
        state = undefined;
    }
    return appReducer(state, action);
}
