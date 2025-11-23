import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    //@ts-ignore
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "join") {
      allSockets.push({ socket, room: parsedMessage?.payload?.roomId });
      console.log(allSockets);
    }
    if (parsedMessage.type === "chat") {
      let currentUser;
      currentUser = allSockets.find((e) => e.socket == socket);
      for (let i = 0; i < allSockets.length; i++) {
        //@ts-ignore
        if (allSockets[i].room === currentUser?.room) {
          allSockets[i]?.socket.send(parsedMessage?.payload?.message);
        }
      }
    }
  });

  socket.on("disconnect", () => {
    allSockets = allSockets.filter((e) => {
      e.socket !== socket;
    });
  });
});
