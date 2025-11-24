import { useEffect, useRef, useState } from "react";
import "./App.css";
import { RiChat3Line } from "react-icons/ri";

function App() {
  const [messages, setMessage] = useState([""]);
  const wssRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  function sendMessage() {
    const message = inputRef?.current?.value;
    wssRef?.current?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: message,
        },
      })
    );
  }
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    wssRef.current = ws;
    ws.onmessage = (event) => {
      setMessage((m) => [...m, event.data]);
    };
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };
  }, []);
  return (
    <div className="flex justify-center items-center bg-neutral-900 text-white h-screen w-screen">
      <div className="min-w-lg h-[85%] p-2 max-w-3xl bg-neutral-900 border border-neutral-700 rounded-lg mt-15 p-4">
        <div className="flex text-white items-center text-2xl">
          <div className="pr-2">
            <RiChat3Line />
          </div>
          <div>Real Time Chat</div>
        </div>
        <div className="text-neutral-400">
          temporoary room that expires after both users exit
        </div>
        <div className="w-full rounded-lg py-2 mt-6 bg-neutral-700">
          <div className="flex justify-between">
            <div className="pl-2 flex">
              <div className="text-neutral-400">Room code :</div>
              <div className="text-neutral-300">#asdas</div>
            </div>
            <div className="flex text-neutral-400 pr-2">
              <div>Users : </div>
              <div className="pl-3"> 1/2</div>
            </div>
          </div>
        </div>
        <div className="border border-neutral-700 h-[65%] max-h-[65%] overflow-y-auto mt-4 rounded-md">
          <div className="flex flex-col gap-2 p-4 ">
            {messages.map((message) => {
              return (
                <div
                  id="{message}"
                  className="bg-white text-black px-3 py-1 rounded-md max-w-[60%] self-end"
                >
                  <div>{message}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center">
          <div className="border border-neutral-700 py-2 pl-2 mt-2 w-[75%] rounded-md">
            <input ref={inputRef} placeholder="Type a message"></input>
          </div>
          <div className="pl-2 w-[25%]">
            <button
              className="bg-white text-black py-2 mt-2 w-full rounded-md"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex justify-center items-center bg-white text-black min-w-2xl max-w-96 h-screen mt-8">
    //   asdsda
    // </div>
  );
}

export default App;
