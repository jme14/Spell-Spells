import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SentenceState {
    sentenceSent: string;
    sentenceRecieved: string;
}

const initialState: SentenceState = {
    sentenceSent: "Type a sentence to cast a spell.",
    sentenceRecieved: "Type a sentence to cast a spell.",
};

export const sentenceSlice = createSlice({
    name: "sentence",
    initialState,
    reducers: {
        submitSentence: (state, action: PayloadAction<string>) => {
            state.sentenceSent = action.payload;
        },
        recieveSentence: (state, action: PayloadAction<string>) => {
            state.sentenceRecieved = action.payload;
            state.sentenceSent = action.payload;
        },
    },
});

export const { submitSentence, recieveSentence } = sentenceSlice.actions;

export default sentenceSlice.reducer;
