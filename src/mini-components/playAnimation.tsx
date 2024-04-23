import Lottie from "lottie-react";
import React from "react";
import noCurrentChat from "../assets/no_current_chat.json";

const PlayAnimation = () => {
  return (
    <div>
      <Lottie animationData={noCurrentChat} classID="" />
    </div>
  );
};

export default PlayAnimation;
