interface LetterBankProps {
    className: string;
    letters?: string[];
}

export default function LetterBank({ className, letters }: LetterBankProps) {
    return (
        <div className={`bg-purple-100 ${className}`}>
            {letters ? letters : "Letters go here!"}
        </div>
    );
}
