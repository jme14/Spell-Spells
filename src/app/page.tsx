"use client";
import Image from "next/image";

import PlayButton from "@/components/home/PlayButton";

import { useInitServerConnection } from "@/hooks/useInitServerConnection";

export default function Home() {
    const { clientConnected } = useInitServerConnection();
    if (!clientConnected) {
        return <div>Loading...</div>;
    }

    // if the client is connected, then we can press play.
    return (
        <div className="flex flex-col items-center h-screen w-screen">
            <div className="">
                <Image
                    src="/images/title.png"
                    alt="Spell Spells"
                    width={1080}
                    height={720}
                ></Image>
            </div>
            <PlayButton className="w-[50vw] h-[25vh]" />
        </div>
    );
}
