import React from "react";
import Header from "./Header";
import Body from "./Body";

const PanelOne = () => {
  return (
    <div className="flex flex-col divide-y-2 divide-white dark:divide-black">
      <Header />
      <Body />
    </div>
  );
};

export default PanelOne;
