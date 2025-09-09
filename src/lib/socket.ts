import { Socket, io } from "socket.io-client";

let socket: Socket | null = null;
let socketPromise: Promise<Socket> | null = null;

export async function initSocket(): Promise<Socket> {
    if (socket) return socket;
    if (socketPromise) return socketPromise;

    socketPromise = (async () => {
        await fetch("http://localhost:4000/init", {
            method: "GET",
            credentials: "include",
        });

        socket = io("http://localhost:4000", { withCredentials: true });

        console.log("Here is the socket now that is has been initialized");
        console.log(socket);

        return socket;
    })();
    return socketPromise;
}
export function getSocket() {
    if (!socket) {
        throw new Error("Socket not initialized, call initSocket");
    }
    console.log("Get socket is returning the following");
    console.log(socket);
    return socket;
}
