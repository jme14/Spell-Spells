import Image from "next/image";
import Spell from "@/types/game/Spell";

interface PlayerCastProps {
    className: string;
    playerCast: Spell | null;
}
export default function PlayerCast({ className, playerCast }: PlayerCastProps) {
    if (playerCast === null) {
        return <div>Your spell will appear here!</div>;
    }

    const attack = playerCast.attack;
    const block = playerCast.block;
    const school = playerCast.school;

    if (school) {
        return (
            <div
                className={`border grid grid-cols-16 grid-rows-16 bg-blue-300 ${className}`}
            >
                <div
                    id="innerBox"
                    className="grid grid-cols-16 grid-rows-16 col-start-2 row-start-2 col-span-14 row-span-14 bg-yellow-50"
                >
                    <div className="relative h-full row-span-12 col-span-16 bg-purple-50">
                        <Image
                            src={`/images/schools/${school.toLowerCase()}.svg`}
                            alt={`${school}`}
                            fill
                        />
                    </div>
                    <div className="grid grid-cols-12 row-span-4 col-span-16 ">
                        <div className="grid place-items-center col-span-6 bg-red-300">
                            <div className="relative h-full aspect-square">
                                <Image
                                    src={`/images/numbers/${attack}.svg`}
                                    alt={`${attack}`}
                                    fill
                                />
                            </div>
                        </div>
                        <div className="grid place-items-center col-span-6 bg-blue-300">
                            <div className="relative h-full aspect-square">
                                <Image
                                    src={`/images/numbers/${block}.svg`}
                                    alt={`${attack}`}
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <div>Fizzle</div>;
}

/*
                            width={36 * imageScale}
                            height={54 * imageScale}
                            className="h-full w-auto"
            <div
                className={`border flex flex-col h-1/2 aspect-[1/1] bg-blue-300 ${className}`}
            >
                <div className="flex-[4] flex justify-center text-center items-center">
                    <div className="w-4/5 h-4/5 bg-blue-100">
                        {playerCast.school}
                    </div>
                </div>
                <div className="flex-[1] flex">
                    <div className="flex flex-1 justify-center items-center">
                        <p className="text-[5vmin]">{playerCast.attack}</p>
                    </div>
                    <div className="flex flex-1 justify-center items-center">
                        <p className="text-[5vmin]">{playerCast.block}</p>
                    </div>
                </div>
            </div>
*/
