"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
class UserManager {
    constructor() {
        this.isPollingStarted = false;
        this.users = {};
    }
    addUser(newUser, serverSocketInstance) {
        this.users[newUser.id] = newUser;
        // If server instance is provided
        // then broadcast to each client
        console.log("This is server instance: ", serverSocketInstance);
        if (serverSocketInstance) {
            this.broadcastToAll(serverSocketInstance);
        }
    }
    // updateUser and addUser can be merged!
    updateUser(user, serverSocketInstance) {
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
    removeUser(websocket, serverSocketInstance) {
        const userIdToRemove = Object.keys(this.users).find((userId) => this.users[userId].websocket === websocket);
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
    broadcastToAll(socket) {
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
exports.UserManager = UserManager;
