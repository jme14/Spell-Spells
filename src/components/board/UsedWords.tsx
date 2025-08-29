interface UsedWordsProps {
    className: string;
    words?: string[];
}
export default function UsedWords({ className, words }: UsedWordsProps) {
    return (
        <div className={`bg-purple-50 ${className}`}>
            {words ? words : "Words will go here"}
        </div>
    );
}
