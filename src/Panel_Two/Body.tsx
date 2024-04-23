import React, { useState } from "react";
import { currentChat_store } from "../store/currentChat_store";
import z from "zod";
import { MessageSchema } from "../zod/chatSchema";
import MessageContainer from "./MessageContainer";

const Body = () => {
  return (
    <div className="w-full h-fit flex-1 p-2">
      <MessageContainer />
    </div>
  );
};

export default Body;
