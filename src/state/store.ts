import { configureStore } from "@reduxjs/toolkit";
import sentenceReducer from "@/state/slices/sentence/sentenceSlice";
import playerCastsReducer from "@/state/slices/playerCasts/playerCastsSlice";
import playerHealthsReducer from "@/state/slices/playerHealths/playerHealthsSlice";
import playerReducer from "@/state/slices/player/playerSlice";
import letterBankReducer from "@/state/slices/letterBank/letterBankSlice";
import usedWordsReducer from "@/state/slices/usedWords/usedWordsSlice";

export const store = configureStore({
    reducer: {
        sentence: sentenceReducer,
        playerCasts: playerCastsReducer,
        playerHealths: playerHealthsReducer,
        player: playerReducer,
        letterBank: letterBankReducer,
        usedWords: usedWordsReducer,
    },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
