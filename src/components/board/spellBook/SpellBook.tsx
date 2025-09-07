import SpellBookIcon from "./SpellBookIcon";

export interface SpellBookProps {
    className?: string;
}

export default function SpellBook({ className = "" }: SpellBookProps) {
    return (
        <div
            className={`flex flex-col flex-1 justify-around items-center ${className}`}
        >
            <SpellBookIcon school="None" />
            <SpellBookIcon school="Fire" />
            <SpellBookIcon school="Ice" />
            <SpellBookIcon school="Life" />
            <SpellBookIcon school="Death" />
        </div>
    );
}
