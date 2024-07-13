import React from "react";
import Header from "../Panel_Two/Header";
import Body from "../Panel_One/Body";
import PanelTwo from "../Panel_Two/PanelTwo";

const Landing = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="md:w-[calc(100%-5rem)] md:h-[calc(100%-5rem)] w-full h-full bg-black flex items-center justify-center">
        {/* left panel */}
        <div className="2xl:block hidden w-[calc(40%)] h-full bg-cyan-500"></div>
        {/* right panel */}
        <div className="flex flex-col w-full h-full border-2 border-cyan-600">
          <PanelTwo />
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
        <span
          key={index}
          className="flex flex-shrink-0 h-[calc(100%/4)] bg-purple-700"
        >
          {item}
        </span>
      ))}
    </>
  );
};

export default Landing;
