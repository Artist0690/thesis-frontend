import React from "react";
import typing from "../assets/typing.json";
import Lottie, { LottiePlayer } from "lottie-react";

const TypingAnimation = () => {
  return <Lottie animationData={typing} className="w-20 tx-purple-400" />;
};

export default TypingAnimation;
