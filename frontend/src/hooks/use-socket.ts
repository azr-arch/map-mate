import { useEffect, useState } from "react";

const WEBSOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL ?? "ws://localhost:8080";

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WEBSOCKET_URL);

        ws.onopen = () => {
            setSocket(ws);
        };

        ws.onclose = () => {
            setSocket(null);
        };

        () => {
            setSocket(null);
        };
    }, []);

    // const sendInfo = useCallback(() => {
    //     if (!socket) {
    //         console.log("Socket not connected, unable to sendInfo");
    //         return;
    //     }

    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             const { latitude, longitude } = position.coords;

    //             const userInfo = {
    //                 type: "user::info",
    //                 latitude,
    //                 longitude,
    //                 name: "azar",
    //             };

    //             socket.send(JSON.stringify(userInfo));
    //         });
    //     }
    // }, [socket]);

    return { socket };
};
