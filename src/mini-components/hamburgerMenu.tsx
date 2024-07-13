import React, { HtmlHTMLAttributes, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@udecode/cn";
import { List, LucideListX } from "lucide-react";
import Modal from "../components/ui/modal";
import { v4 } from "uuid";
import { chats_store } from "../store/chats_store";
import ChatListTemplate from "../Panel_One/ChatListTemplate";
import SideDrawer from "./sideDrawer";
import { logout } from "../api/logout";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
  const [open, setopen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sideDrawer, setSideDrawer] = useState(false);

  // store
  const { chats } = chats_store();

  // router
  const router = useNavigate();

  const handleToggle = () => {
    setopen(!open);
  };

  return (
    <div>
      <button
        onClick={() => handleToggle()}
        className="p-2 border-2 rounded-lg border-slate-300 dark:border-slate-500 focus:ring-1 focus:ring-purple-500 ring-offset-1"
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
            className="absolute transform -translate-x-1/3 translate-y-3 w-auto h-auto px-3 py-2 overflow-hidden shadow-lg cursor-pointer bg-gray-50 dark:bg-gray-700 divide-y divide-slate-300 dark:divide-zinc-600 rounded-lg"
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
              signout
            </Item>
            <Item
              key={v4()}
              className="2xl:hidden"
              onClick={() => setModalOpen(true)}
            >
              chats
            </Item>
            <Item
              key={v4()}
              className="2xl:hidden"
              onClick={() => setSideDrawer((prv) => !prv)}
            >
              search
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
        "relative flex justify-center items-center w-full sm:px-6 px-2 py-2 font-[Inter] text-xs  capitalize text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-slate-600",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
