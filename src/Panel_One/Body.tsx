import React from "react";
import ChatCard from "../mini-components/chatCard";

const Body = () => {
  return (
    <div className="flex flex-col h-auto py-4 px-3 gap-y-3">
      <ChatCard name="alice" email="alice@gmail.com" disabled={true} />
      <ChatCard name="bob" email="bob@gmail.com" disabled={false} />
      <ChatCard name="joe" email="joe00&@gmail.com" disabled={false} />
    </div>
  );
};

export default Body;
