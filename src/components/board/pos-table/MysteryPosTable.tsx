import { PosGeneral } from "spell-spells-schema";
interface MysteryPosProps {
    className?: string;
    counts: Record<PosGeneral, number>;
}
export default function MysteryPosTable({
    className = "",
    counts,
}: MysteryPosProps) {
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
