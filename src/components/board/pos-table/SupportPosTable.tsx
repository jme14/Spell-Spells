import { PosGeneral } from "spell-spells-schema";
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
        <div className={`${className}`}>
            {entries.map(([pos, amount]) => (
                <div
                    className="flex border justify-center items-center"
                    key={pos}
                >{`${pos} ${amount}`}</div>
            ))}
        </div>
    );
}
