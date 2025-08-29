import Image from "next/image";
interface HealthOrbProps {
    className: string;
    health: number;
}
export default function HealthOrb({ className, health }: HealthOrbProps) {
    return (
        <div className={`relative ${className}`}>
            <Image
                src={`/images/numbers/${health}.svg`}
                alt={`${health}`}
                fill
            ></Image>
        </div>
    );
}
