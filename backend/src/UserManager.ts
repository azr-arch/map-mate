import { Server, WebSocket } from "ws";

export interface User {
    id: string;
    username: string;
    coords: number[];
    websocket?: WebSocket;
}

export class UserManager {
    private users: Record<string, User>; // How do i make it type of object with id and User
    private isPollingStarted: boolean = false;

    constructor() {
        this.users = {};
    }

    addUser(newUser: User, serverSocketInstance?: Server<typeof WebSocket>) {
        this.users[newUser.id] = newUser;

        // If server instance is provided
        // then broadcast to each client

        console.log("This is server instance: ", serverSocketInstance);
        if (serverSocketInstance) {
            this.broadcastToAll(serverSocketInstance);
        }
    }
    // updateUser and addUser can be merged!
    updateUser(user: User, serverSocketInstance?: Server<typeof WebSocket>) {
        if (!this.users[user.id]) {
            console.log("No user exists with this id");
            return;
        }
        // Successfully updated the user
        this.users[user.id] = user;

        if (serverSocketInstance) {
            this.broadcastToAll(serverSocketInstance);
        }
    }

    removeUser(websocket: WebSocket, serverSocketInstance?: Server<typeof WebSocket>) {
        const userIdToRemove = Object.keys(this.users).find(
            (userId) => this.users[userId].websocket === websocket
        );
        if (userIdToRemove) {
            delete this.users[userIdToRemove];
        }

        console.log("A User has been removed");

        if (serverSocketInstance) {
            this.broadcastToAll(serverSocketInstance);
        }
    }

    getUsersAsArray() {
        return Object.values(this.users);
    }

    private broadcastToAll(socket: Server<typeof WebSocket>) {
        console.log("Broadcasting to all clients: ", this.getUsersAsArray());

        socket.clients.forEach((client) => {
            client.send(JSON.stringify(this.getUsersAsArray()), (err) => {
                if (err) {
                    console.log("Error broadcasting to all clients: ", err);
                }
            });
        });
    }
}
