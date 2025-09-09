"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/hooks";
import {
    setGameId,
    markPlayer2,
    flipTurn,
} from "@/state/slices/player/playerSlice";
import { getSocket } from "@/lib/socket";

interface MatchFoundResponse {
    gameId: string;
    isPlayerOne: boolean;
}

export default function Waiting() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const socket = getSocket();
        socket.emit("waiting");
        const onMatchFound = ({ gameId, isPlayerOne }: MatchFoundResponse) => {
            dispatch(setGameId(gameId));

            // if player2, mark them as such
            if (isPlayerOne === false) {
                dispatch(markPlayer2());
                // otherwise, mark it as their turn
            } else {
                dispatch(flipTurn());
            }

            router.push(`/game/${gameId}`);
        };
        socket.on("matchFound", onMatchFound);
        return () => {
            socket.off("matchFound", onMatchFound);
        };
    }, [router, dispatch]);
    return <div>You are in the waiting room!</div>;
}
