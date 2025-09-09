import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { submitSentence } from "@/state/slices/sentence/sentenceSlice";

interface CastBoxProps {
    className: string;
}
export function CastBox({ className }: CastBoxProps) {
    const dispatch = useAppDispatch();
    const { myTurn } = useAppSelector((state) => state.player.value);
    const [sentenceLocal, setSentenceLocal] = useState("");

    function onEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && myTurn) {
            dispatch(submitSentence(sentenceLocal));
        }
    }

    return (
        <input
            className={`border  ${className}`}
            type="text"
            value={sentenceLocal}
            onChange={(e) => setSentenceLocal(e.target.value)}
            onKeyDown={onEnterKey}
        />
    );
}
