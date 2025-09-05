import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerHealthsState {
    value: {
        p1Health: number;
        p2Health: number;
    };
}

const initialState: PlayerHealthsState = {
    value: {
        p1Health: 9,
        p2Health: 9,
    },
};

export const playerHealthsSlice = createSlice({
    name: "playerHealths",
    initialState,
    reducers: {
        p1Decrement: (state) => {
            state.value.p1Health -= 1;
        },
        p1DecrementNTimes: (state, action: PayloadAction<number>) => {
            state.value.p1Health -= action.payload;
        },
        p2Decrement: (state) => {
            state.value.p2Health -= 1;
        },
        p2DecrementNTimes: (state, action: PayloadAction<number>) => {
            state.value.p2Health -= action.payload;
        },
        p1Increment: (state) => {
            state.value.p1Health += 1;
        },
        p1IncrementNTimes: (state, action: PayloadAction<number>) => {
            state.value.p1Health += action.payload;
        },
        p2Increment: (state) => {
            state.value.p2Health += 1;
        },
        p2IncrementNTimes: (state, action: PayloadAction<number>) => {
            state.value.p2Health += action.payload;
        },
    },
});
export const {
    p1Decrement,
    p1DecrementNTimes,
    p2Decrement,
    p2DecrementNTimes,
    p1Increment,
    p1IncrementNTimes,
    p2Increment,
    p2IncrementNTimes,
} = playerHealthsSlice.actions;

export default playerHealthsSlice.reducer;
