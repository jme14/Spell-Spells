interface VerticalTextProps {
    className: string;
    text: string;
}
export default function VerticalText({ className, text }: VerticalTextProps) {
    const charArray = text.split("");
    console.log(charArray);
    return (
        <div
            className={`flex flex-col justify-center min-w-[50px] ${className}`}
        >
            {charArray.map((char, index) => (
                <span key={index}>{char}</span>
            ))}
        </div>
    );
}
