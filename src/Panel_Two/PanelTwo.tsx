import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";

const PanelTwo = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default PanelTwo;
