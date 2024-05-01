import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

const URL = "http://localhost:5000";
const socket = io(URL);

const TestSomething = () => {
  useEffect(() => {
    // TODO: join setup event
    socket.emit("setup", { userId: "efgh" });

    // TODO: listen setup event
    socket.on("setup", (data: string) => {
      toast.warning(data, { position: "top-right", duration: 2000 });
    });

    // TODO: listen test event
    socket.on("test", (data: string) => {
      toast.warning(data, { position: "top-right", duration: 2000 });
    });
  }, []);

  return <div>test</div>;
};

export default TestSomething;
