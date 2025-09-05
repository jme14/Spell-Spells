import { RootState } from "@/state/store";

export function selectGameState(state: RootState) {
    return {
        sentence: state.sentence,
        playerCasts: state.playerCasts,
        playerHealths: state.playerHealths,
        // tree
        // lastSentGenPos
        usedWords: state.usedWords,
        letterBank: state.letterBank,
        player: state.player,
    };
}
