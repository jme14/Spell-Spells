import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsedWordsState {
    value: Array<string>;
}

const initialState: UsedWordsState = {
    value: [],
};

export const usedWordsSlice = createSlice({
    name: "usedWords",
    initialState,
    reducers: {
        addWord: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload);
            // start removing words if too many words are used
            // might change this
            if (state.value.length > 50) {
                state.value.shift();
            }
        },
    },
});
export const { addWord } = usedWordsSlice.actions;
export default usedWordsSlice.reducer;
