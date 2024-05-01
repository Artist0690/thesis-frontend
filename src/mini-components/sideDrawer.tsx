import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { FaWindowClose } from "react-icons/fa";

type PropsType = {
  open: boolean;
  setOpen: () => void;
};

const SideDrawer = ({ open, setOpen }: PropsType) => {
  // local state
  const [input, setinput] = useState<string>("");

  const disabled = input.trim().length > 0 ? false : true;

  const { x } = useSpring({
    x: open ? 0 : -100,
  });

  return (
    <animated.div
      style={{
        transform: x.to((value) => `translateX(${value}%)`),
        position: "fixed",
        top: 0,
        left: 0,
        padding: "20px",
      }}
    >
      <div className="flex flex-col w-fit h-full bg-white dark:bg-zinc-700 shadow-lg rounded-lg">
        {/* header */}
        <div className="flex justify-between items-center gap-x-4 px-2 py-3">
          <div>
            <input
              value={input}
              onChange={(e) => setinput(e.target.value)}
              type="text"
              className="px-2 py-3 rounded-lg bg-zinc-200 dark:bg-zinc-600 focus:ring-1 ring-offset-1 focus:outline-none focus:ring-purple-500 border border-zinc-500 dark:border-zinc-400 caret-purple-500 text-zinc-600 dark:text-white outline-none"
              placeholder="Search"
            />
          </div>
          {/* search button */}
          <button
            className="capitalize bg-purple-400 disabled:bg-zinc-300 dark:disabled:bg-zinc-600 disabled:border-zinc-300 dark:disabled:border-zinc-600 disabled:cursor-not-allowed hover:bg-opacity-30 border border-purple-400 text-black dark:text-white rounded-lg px-2 py-3"
            disabled={disabled}
          >
            search
          </button>
          {/* close button */}
          <span>
            <FaWindowClose
              className="size-8 text-red-700 hover:text-red-500"
              onClick={() => setOpen()}
            />
          </span>
        </div>
        {/* body */}
        <div>no users</div>
      </div>
    </animated.div>
  );
};

export default SideDrawer;
