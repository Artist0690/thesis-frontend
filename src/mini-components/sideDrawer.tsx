import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import cross_icon from "../assets/close-line-icon.svg";
import { searchUser_controller } from "../controllers/searchUser_controller";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import z from "zod";
import { UserSchema } from "../zod/userSchema";
import UserCard from "./userCard";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";

type PropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type User = z.infer<typeof UserSchema>;

const SideDrawer = ({ open, setOpen }: PropsType) => {
  // local state
  const [input, setinput] = useState<string>("");
  const [users, setusers] = useState<User[] | null>(null);

  const disabled = input.trim().length > 0 ? false : true;

  // TODO: axios private hook
  const axiosPrivate = useAxiosPrivate();

  const { x } = useSpring({
    x: open ? 0 : -100,
  });

  // TODO: handle search button
  const handleSearch = async () => {
    const keyword = input.trim();

    if (keyword.length < 1) {
      return;
    }

    // TODO: search User
    searchUser_controller({
      fetcher: axiosPrivate,
      name: keyword,
      setUsers: setusers,
    });
  };

  // TODO: handle close button
  const handleClose = () => {
    setusers(null);
    setinput("");
    setOpen(false);
  };

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setinput(e.target.value);
  };

  return (
    <animated.div
      style={{
        maxWidth: "400px",
        transform: x.to((value) => `translateX(${value}%)`),
        position: "fixed",
        top: 0,
        left: 0,
        padding: "20px",
        zIndex: "1",
      }}
    >
      {/* container */}
      <div className="flex flex-col w-fit h-full bg-white dark:bg-zinc-700 shadow-lg rounded-lg overflow-hidden">
        {/* header */}
        <div className="flex justify-between items-center gap-x-4 px-2 py-3">
          <div className="flex flex-row w-fit h-10 gap-x-3 justify-between items-center">
            {/* input */}
            <div className="h-full">
              <input
                value={input}
                onChange={(e) => handleChange(e)}
                type="text"
                className="h-full px-2 rounded-md bg-zinc-200 dark:bg-zinc-600 focus:ring-1 ring-offset-1 focus:outline-none focus:ring-purple-500 border border-zinc-300 dark:border-zinc-400 caret-purple-500 text-zinc-600 dark:text-white outline-none font-[inter thin]"
                placeholder="Search"
              />
            </div>
            {/* search button */}
            <button
              className="capitalize h-full bg-purple-400 disabled:bg-zinc-300 dark:disabled:bg-zinc-600 disabled:border-zinc-300 dark:disabled:border-zinc-600 disabled:cursor-not-allowed hover:bg-opacity-50 focus:ring-1 text-white rounded-lg px-3 py-2 outline-none font-[inter thin] font-normal"
              disabled={disabled}
              onClick={handleSearch}
            >
              search
            </button>
            {/* close button */}
            <span
              onClick={() => handleClose()}
              className="w-fit p-2 hover:bg-rose-400 rounded-sm transform duration-150"
            >
              <img
                src={cross_icon}
                className="w-4 text-red-700 hover:text-red-500"
              />
            </span>
          </div>
        </div>

        {/* TODO: Body */}
        <div className="flex w-full h-fit p-2 flex-col divide-y divide-zinc-300 gap-y-2 bg-white dark:bg-zinc-700">
          {users == null ||
            (users?.length == 0 && (
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: { delay: 0.2 },
                }}
                className="font-[inter thin] text-center capitalize py-2"
              >
                no users
              </motion.span>
            ))}
          {users && users.map((user) => <UserCard key={uuid()} user={user} />)}
        </div>
      </div>
    </animated.div>
  );
};

export default SideDrawer;
