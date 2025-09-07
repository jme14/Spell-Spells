import { useState } from "react";
import Image from "next/image";
import { schoolToDescription } from "@/utils/schoolToDescription";

export interface SpellBookIconProps {
    school: string;
    className?: string;
}
export default function SpellBookIcon({
    school,
    className = "",
}: SpellBookIconProps) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className={`relative ${className}`}>
            <Image
                src={`/images/schools/${school.toLowerCase()}.svg`}
                alt={school}
                width={80}
                height={80}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            ></Image>
            {hovered && (
                <div className="absolute top-1/3 right-full ml-2 text-black rounded shadow-lg min-w-[200px]">
                    {schoolToDescription(school)
                        ?.split(",")
                        .map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                </div>
            )}
        </div>
    );
}
