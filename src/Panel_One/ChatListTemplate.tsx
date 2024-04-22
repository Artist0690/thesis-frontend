import React from "react";
import z from "zod";
import { ChatSchema } from "../zod/chatSchema";
import ChatCard from "../mini-components/chatCard";
import { v4 } from "uuid";

type Chat = z.infer<typeof ChatSchema>;

type Props = {
  chatLists: Chat[];
};

const ChatListTemplate = (props: Props) => {
  const { chatLists } = props;

  if (chatLists == null || chatLists.length < 1) return <div>No chats yet</div>;

  return (
    <div className="flex flex-col h-auto py-4 px-3 gap-y-3">
      {chatLists.map((chat) => (
        <ChatCard key={v4()} chat={chat} />
      ))}
    </div>
  );
};

export default ChatListTemplate;
