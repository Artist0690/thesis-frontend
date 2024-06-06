import Lottie from "lottie-react";
import React from "react";
import noCurrentChat from "../assets/no_current_chat.json";

const PlayAnimation = () => {
  return <Lottie className="w-1/2" animationData={noCurrentChat} />;
};

export default PlayAnimation;
