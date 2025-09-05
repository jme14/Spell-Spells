import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
    value: {
        myTurn: boolean;
        player1: boolean;
        gameId: string;
    };
}

const initialState = {
    value: {
        myTurn: false,
        player1: true,
        gameId: "uninitialized",
    },
};

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        flipTurn: (state) => {
            state.value.myTurn = !state.value.myTurn;
        },
        markPlayer2: (state) => {
            state.value.player1 = false;
        },
        setGameId: (state, action: PayloadAction<string>) => {
            state.value.gameId = action.payload;
        },
    },
});

export const { flipTurn, markPlayer2, setGameId } = playerSlice.actions;

export default playerSlice.reducer;
