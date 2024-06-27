"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const UserManager_1 = require("./UserManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const userManager = new UserManager_1.UserManager();
wss.on("connection", function connection(ws) {
    // userManager.addUser(ws);
    ws.on("error", (err) => console.error(err));
    ws.on("message", function message(data) {
        const realData = JSON.parse(data.toString());
        if (realData.type === "user::add") {
            realData.data.websocket = ws;
            userManager.addUser(realData.data);
            userManager.addHandler(wss);
        }
    });
    ws.on("disconnect", () => userManager.removeUser(ws));
});
// Add a recurring function too, for continuos update
// or is there an efficient approach for this ?
