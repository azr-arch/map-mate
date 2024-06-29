import { useEffect, useState } from "react";

export interface User {
    id: string;
    username: string;
    coords: number[];
    websocket: WebSocket;
}

export const useOtherLocation = (socket: WebSocket | null) => {
    const [activeUsers, setActiveUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!socket) return;
        // Latching on to socket the event of getting all users

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // message will be array of users who are active
            setActiveUsers(message);
        };
    }, [socket]);

    return { activeUsers };
};
