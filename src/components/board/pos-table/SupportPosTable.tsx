import { PosGeneral } from "@/types/nlp/PosGeneral";
interface SupportPosProps {
    className?: string;
    counts: Record<PosGeneral, number>;
}
export default function SupportPosTable({
    className = "",
    counts,
}: SupportPosProps) {
    const entries = Object.entries(counts);
    return (
        <div className={`grid grid-cols-2 h-1/4 ${className}`}>
            {entries.map(([pos, amount]) => (
                <div
                    className="flex border justify-center items-center"
                    key={pos}
                >{`${pos} ${amount}`}</div>
            ))}
        </div>
    );
}
