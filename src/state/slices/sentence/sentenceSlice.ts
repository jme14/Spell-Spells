import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SentenceState {
    value: string;
}

const initialState: SentenceState = {
    value: "Type a sentence to cast a spell.",
};

export const sentenceSlice = createSlice({
    name: "sentence",
    initialState,
    reducers: {
        newSentence: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { newSentence } = sentenceSlice.actions;

export default sentenceSlice.reducer;
