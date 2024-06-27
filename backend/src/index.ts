import { WebSocketServer } from "ws";
import { User, UserManager } from "./UserManager";

export interface Message {
    type: string;
    data: User;
}

const wss = new WebSocketServer({ port: 8080 });
const userManager = new UserManager();

wss.on("connection", function connection(ws) {
    // userManager.addUser(ws);
    ws.on("error", (err) => console.error(err));

    ws.on("message", function message(data) {
        const realData: Message = JSON.parse(data.toString());

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
