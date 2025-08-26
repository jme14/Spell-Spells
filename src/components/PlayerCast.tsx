import Spell from "@/types/game/Spell";

interface PlayerCastProps {
    playerCast: Spell | null;
}
export default function PlayerCast({ playerCast }: PlayerCastProps) {
    if (playerCast === null) {
        return <div>Your spell will appear here!</div>;
    }

    console.log("In player cast!");
    console.log(playerCast);
    if (playerCast.school) {
        return (
            <div className="border flex flex-col w-full aspect-[7/10] bg-blue-300">
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
        );
    }
    return <div>Fizzle</div>;
}
