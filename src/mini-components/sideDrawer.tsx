import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { FaWindowClose } from "react-icons/fa";
import { searchUser_controller } from "../controllers/searchUser_controller";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import z from "zod";
import { UserSchema } from "../zod/userSchema";
import UserCard from "./userCard";
import { v4 as uuid } from "uuid";

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
      {/* TODO: header */}
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
            onClick={handleSearch}
          >
            search
          </button>
          {/* close button */}
          <span>
            <FaWindowClose
              className="size-8 text-red-700 hover:text-red-500"
              onClick={() => handleClose()}
            />
          </span>
        </div>
        {/* body */}
        {/* TODO: Body */}
        <div className="flex h-fit p-2">
          {users == null ||
            (users?.length == 0 && (
              <span className="capitalize">no users</span>
            ))}
          {users && users.map((user) => <UserCard key={uuid()} user={user} />)}
        </div>
      </div>
    </animated.div>
  );
};

export default SideDrawer;
