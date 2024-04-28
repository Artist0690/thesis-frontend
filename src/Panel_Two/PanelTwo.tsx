import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import { currentChat_store } from "../store/currentChat_store";

const PanelTwo = () => {
  // store
  const { currentChat } = currentChat_store();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header />
      <Body />
      {currentChat && <Footer />}
    </div>
  );
};

export default PanelTwo;
