import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

// let userCount = 0;

let allSockets: WebSocket[] = [];

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

  socket.on("disconnect", () => {
    allSockets = allSockets.filter((e) => {
      e !== socket;
    });
  });
});
