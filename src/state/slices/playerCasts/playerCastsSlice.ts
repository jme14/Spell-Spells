import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Spell } from "spell-spells-schema";

export interface PlayerCastsState {
    value: {
        slotA: Spell | null; //p2
        slotB: Spell | null;
        slotC: Spell | null; //p1
        slotD: Spell | null;
    };
}

const initialState: PlayerCastsState = {
    value: {
        slotA: null,
        slotB: null,
        slotC: null,
        slotD: null,
    },
};

export const playerCastsSlice = createSlice({
    name: "playerCast",
    initialState,
    reducers: {
        newSpellSlotA: (state, action: PayloadAction<Spell | null>) => {
            state.value.slotA = action.payload;
        },
        newSpellSlotB: (state, action: PayloadAction<Spell | null>) => {
            state.value.slotB = action.payload;
        },
        newSpellSlotC: (state, action: PayloadAction<Spell | null>) => {
            state.value.slotC = action.payload;
        },
        newSpellSlotD: (state, action: PayloadAction<Spell | null>) => {
            state.value.slotD = action.payload;
        },
    },
});

export const { newSpellSlotA, newSpellSlotB, newSpellSlotC, newSpellSlotD } =
    playerCastsSlice.actions;
export default playerCastsSlice.reducer;
