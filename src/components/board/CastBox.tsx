import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { newSentence } from "@/state/slices/sentence/sentenceSlice";

interface CastBoxProps {
    className: string;
}
export function CastBox({ className }: CastBoxProps) {
    const dispatch = useAppDispatch();
    const { myTurn } = useAppSelector((state) => state.player.value);
    const [sentence, setSentence] = useState("");

    function onEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && myTurn) {
            dispatch(newSentence(sentence));
        }
    }

    return (
        <input
            className={`border  ${className}`}
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            onKeyDown={onEnterKey}
        />
    );
}
