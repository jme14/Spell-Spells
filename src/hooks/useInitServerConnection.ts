import { useState, useEffect } from "react";

import { initSocket } from "@/lib/socket";

export function useInitServerConnection() {
    const [clientConnected, setClientConnected] = useState(false);

    useEffect(() => {
        let cancelWaiting = false;
        const emitWaiting = async () => {
            const socket = await initSocket();
            if (cancelWaiting) return;

            if (socket.connected) {
                // socket.emit("waiting");
                setClientConnected(true);
            } else {
                socket.once("connect", () => {
                    // socket.emit("waiting");
                    setClientConnected(true);
                });
            }
        };

        emitWaiting();
        return () => {
            cancelWaiting = true;
        };
    }, [setClientConnected]);

    return { clientConnected };
}
