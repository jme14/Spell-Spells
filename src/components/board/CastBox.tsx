import { useState } from "react";

interface CastBoxProps {
    className: string;
    onSentenceSubmit: (sent: string) => void;
}
export function CastBox({ className, onSentenceSubmit }: CastBoxProps) {
    const [sentence, setSentence] = useState("");

    function onEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            onSentenceSubmit(sentence);
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
