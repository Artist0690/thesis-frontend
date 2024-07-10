import React from "react";
import Header from "./Header";
import Body from "./Body";

const PanelOne = () => {
  return (
    <div className="flex flex-col h-full  border-indigo-600">
      <Header />
      <Body />
    </div>
  );
};

export default PanelOne;
