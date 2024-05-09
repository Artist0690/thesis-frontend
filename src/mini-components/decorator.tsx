import React from "react";

const Decorator = () => {
  return (
    <div className="absolute w-[300px] h-[300px] left-[50%] top-[30%] bg-violet-500 rounded-3xl transform rotate-45">
      <div className="w-full h-full relative bg-white bg-opacity-10 z-10 blur-lg"></div>
    </div>
  );
};

export default Decorator;
