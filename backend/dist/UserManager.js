"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
class UserManager {
    constructor() {
        this.isPollingStarted = false;
        this.users = {};
    }
    addUser(newUser) {
        this.users[newUser.id] = newUser;
        console.log("A user is joined");
        let size = Object.keys(this.users).length;
        if (!this.isPollingStarted && size >= 2) {
            this.isPollingStarted = true;
        }
    }
    removeUser(websocket) {
        // Implement this removing function
        const userIdToRemove = Object.keys(this.users).find((userId) => this.users[userId].websocket === websocket);
        if (userIdToRemove) {
            delete this.users[userIdToRemove];
        }
        return;
    }
    getUsersAsArray() {
        return Object.values(this.users);
    }
    // Should i move this part out because ??
    // Send continous update when there are more than 1 person
    addHandler(socket) {
        if (Object.keys(this.users).length > 1) {
            console.log("Starting broadcasting");
            setInterval(() => {
                // Start broadcasting to all clients their position
                socket.clients.forEach((client) => {
                    client.send(JSON.stringify(this.getUsersAsArray()), (err) => {
                        if (err) {
                            console.log("Error broadcasting to all clients: ", err);
                        }
                    });
                });
            }, 10000);
        }
    }
}
exports.UserManager = UserManager;
