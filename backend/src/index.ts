import { WebSocketServer } from "ws";
import { User, UserManager } from "./UserManager";

export interface Message {
    type: string;
    data: User;
}

const wss = new WebSocketServer({ port: 8080 });
const userManager = new UserManager();

wss.on("connection", function connection(ws) {
    ws.on("error", (err) => console.error(err));

    ws.on("message", function message(data) {
        const realData: Message = JSON.parse(data.toString());

        console.log("Getting data on server: ", realData);

        if (realData.type === "user::add") {
            realData.data.websocket = ws;
            userManager.addUser(realData.data, wss);
        }

        if (realData.type === "user::update") {
            realData.data.websocket = ws;
            userManager.updateUser(realData.data, wss);
        }

        if (realData.type === "user::remove") {
            userManager.removeUser(ws, wss);
        }
    });

    ws.on("close", () => userManager.removeUser(ws, wss));
});

// Add a recurring function too, for continuos update
// or is there an efficient approach for this ?
