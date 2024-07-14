import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "@udecode/cn";
import { List, LogOut, LucideListX, MessageCircle, Search } from "lucide-react";
import Modal from "../components/ui/modal";
import { v4 } from "uuid";
import { chats_store } from "../store/chats_store";
import ChatListTemplate from "../Panel_One/ChatListTemplate";
import SideDrawer from "./sideDrawer";
import { logout } from "../api/logout";
import { useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

const HamburgerMenu = () => {
  const [open, setopen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sideDrawer, setSideDrawer] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // store
  const { chats } = chats_store();

  // router
  const router = useNavigate();

  const handlePopupMenu = (e: MouseEvent) => {
    if (!menuRef.current?.contains(e.target as Node)) setopen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handlePopupMenu);

    return () => {
      document.addEventListener("mousedown", handlePopupMenu);
    };
  }, []);

  return (
    <div ref={menuRef}>
      <button
        onClick={() => setopen((prv) => !prv)}
        className="p-2 border-2 rounded-lg border-slate-300 dark:border-slate-500 focus:border-0 focus:ring-1 focus:ring-purple-500 outline-none"
      >
        {open ? (
          <LucideListX className="text-slate-400 dark:text-slate-500" />
        ) : (
          <List className=" text-slate-400 dark:text-slate-500" />
        )}
      </button>

      {open && (
        <AnimatePresence>
          <motion.div
            key={"hamburger-menu"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.1, duration: 0.3, when: "once" },
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute transform -translate-x-2/4 translate-y-3 w-auto h-auto px-2 py-2 overflow-hidden shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 divide-y divide-slate-300 dark:divide-zinc-600 rounded-lg"
            id="dropdown"
            aria-labelledby="dropdownButton"
          >
            <Item
              key={v4()}
              onClick={() => {
                logout();
                router("/signin");
              }}
            >
              <span className="inline-block mr-2">
                <LogOut className="w-4 h-4" />
              </span>
              <p className="inline-block">signout</p>
            </Item>
            <Item
              key={v4()}
              className="2xl:hidden"
              onClick={() => setModalOpen(true)}
            >
              <span className="inline-block mr-2">
                <MessageCircle className="w-4 h-4" />
              </span>
              <p className="inline-block">chats</p>
            </Item>
            <Item
              key={v4()}
              className="2xl:hidden"
              onClick={() => setSideDrawer((prv) => !prv)}
            >
              <span className="inline-block mr-2">
                <Search className="w-4 h-4" />
              </span>
              <p className="inline-block">search</p>
            </Item>
          </motion.div>
        </AnimatePresence>
      )}
      {/* modal */}
      <Modal openModal={modalOpen} setOpenModal={setModalOpen} key={v4()}>
        <ChatListTemplate
          key={v4()}
          chatLists={chats}
          className="bg-white dark:bg-slate-700 divide-y divide-zinc-200 dark:divide-slate-600 pr-3"
        />
      </Modal>
      {/* side drawer */}
      <SideDrawer key={v4()} open={sideDrawer} setOpen={setSideDrawer} />
    </div>
  );
};

export default HamburgerMenu;

interface ItemProps extends HtmlHTMLAttributes<HTMLSpanElement> {
  className?: string;
  children: React.ReactNode;
}

const Item = ({ className, children, ...props }: ItemProps) => {
  return (
    <span
      className={cn(
        "relative flex w-full px-4 py-2 font-[Inter] text-xs  capitalize text-black dark:text-white hover:bg-zinc-200 hover:rounded-md dark:hover:bg-slate-600",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
