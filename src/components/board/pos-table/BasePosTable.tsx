import { PosGeneral } from "spell-spells-schema";

interface BasePosTableProps {
    className: string;
    counts: Record<PosGeneral, number>;
}

export default function BasePosTable({ className, counts }: BasePosTableProps) {
    const entries = Object.entries(counts);
    return (
        <div className={`grid grid-cols-2 h-full ${className}`}>
            {entries.map(([pos, amount]) => (
                <div
                    className="flex justify-center items-center border "
                    key={pos}
                >
                    {`${pos} ${amount}`}{" "}
                </div>
            ))}
        </div>
    );
}
