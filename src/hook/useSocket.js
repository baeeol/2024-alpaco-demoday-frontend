import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import config from "config/config";

const sockets = {};

const useSocket = (namespace, room) => {
  const [socket, setSocket] = useState(undefined);

  useEffect(() => {
    if (!sockets[room]) {
      sockets[room] = io(`${config.SERVER_ADDRESS}/${namespace}`, {
        autoConnect: false,
        transports: ["websocket"],
        query: { groupChatId: room },
      });
    }
    if (sockets[room]) {
      sockets[room].connect();
      setSocket(sockets[room]);
    }

    return () => {
      if (sockets[room]) {
        sockets[room].disconnect();
        delete sockets[room];
      }
    };
  }, []);

  return { socket };
};

export default useSocket;
