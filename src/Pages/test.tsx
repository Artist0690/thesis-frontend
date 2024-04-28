import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import useStartSocket from "../hooks/useStartSocket";
import useBrowserAgent from "../hooks/useBrowserAgent";

const TestSomething = () => {
  // const [message, setmessage] = useState<any>(null);
  // const [input, setinput] = useState<string>("");

  // // hooks
  // const { browserAgent } = useBrowserAgent();

  // const {
  //   handleSubmit,
  //   handleJoin,
  //   handleTyping,
  //   handleStopTyping,
  // } = useStartSocket({
  //   sender: browserAgent,
  //   input: input,
  //   setmessage: setmessage,
  //   setinput: setinput,
  // });

  // return (
  //   <div className="w-screen h-screen flex items-center justify-center">
  //     <div className="flex flex-col w-fit h-fit gap-y-3 shadow-lg p-3">
  //       <div className="flex flex-col gap-y-3">
  //         <input
  //           onBlur={handleStopTyping}
  //           onFocus={(e) => handleTyping(e)}
  //           value={input}
  //           onChange={(e) => setinput(e.target.value)}
  //           type="text"
  //           className="bg-zinc-400 rounded-lg p-3 caret-zinc-600 font-[poppins] text-zinc-700 font-semibold"
  //         />
  //         <button
  //           onClick={handleSubmit}
  //           className="bg-blue-500 rounded-lg px-2 py-2 text-white uppercase"
  //         >
  //           send
  //         </button>
  //         <button
  //           onClick={handleJoin}
  //           className="bg-green-400 p-2 text-black rounded-lg uppercase"
  //         >
  //           join
  //         </button>
  //       </div>
  //       {/* chat bubbles */}
  //       <div className="text-blue-500 font-[poppins] bg-zinc-300 px-2 py-4">
  //         {message && message}
  //       </div>
  //     </div>
  //   </div>
  // );

  return <div>test TestSomething</div>;
};

export default TestSomething;
