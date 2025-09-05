import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LetterBankState {
    value: Array<string>;
}

const initialState: LetterBankState = {
    value: [],
};

export const letterBankSlice = createSlice({
    name: "letterBank",
    initialState,
    reducers: {
        setLetterBank: (state, action: PayloadAction<Array<string>>) => {
            state.value = action.payload;
        },
        addLetterToBank: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload);
        },
    },
});

export const { setLetterBank, addLetterToBank } = letterBankSlice.actions;

export default letterBankSlice.reducer;
