import { useState } from "react";

interface CastBoxProps {
    onSentenceSubmit: (sent: string) => void;
}
export function CastBox({ onSentenceSubmit }: CastBoxProps) {
    const [sentence, setSentence] = useState("");

    function onEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            onSentenceSubmit(sentence);
        }
    }

    return (
        <input
            className="border max-h-30 min-h-30 max-w-3/5 min-w-3/5"
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            onKeyDown={onEnterKey}
        />
    );
}
