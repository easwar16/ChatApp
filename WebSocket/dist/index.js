import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount += 1;
    console.log("User Connected #" + userCount);
    socket.on("message", (message) => {
        console.log(message.toString());
        if (allSockets.length > 0) {
            allSockets.forEach((current) => {
                current.send(message.toString() + ": Message sent from the User");
            });
            // for (let i = 0; i < allSockets.length; i++) {
            //   allSockets[i].send(message.toString() + ": Message sent from the User");
            // }
        }
        // socket.send(message.toString() + ": Message sent from the User");
    });
});
//# sourceMappingURL=index.js.map