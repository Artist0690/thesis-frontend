import React, { useEffect, useState } from "react";

const useBrowserAgent = () => {
  const [browserAgent, setbrowserAgent] = useState<string>("");

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    console.log(browserAgent);

    if (userAgent.indexOf("Firefox") > -1) {
      setbrowserAgent("Mozilla Firefox");
    } else if (userAgent.indexOf("Chrome") > -1) {
      setbrowserAgent("Google Chrome");
    } else if (userAgent.indexOf("Safari") > -1) {
      setbrowserAgent("Apple Safari");
    } else if (
      userAgent.indexOf("Opera") > -1 ||
      userAgent.indexOf("OPR") > -1
    ) {
      setbrowserAgent("Opera");
    } else if (userAgent.indexOf("Edge") > -1) {
      setbrowserAgent("Microsoft Edge");
    } else if (
      userAgent.indexOf("MSIE") > -1 ||
      userAgent.indexOf("Trident/") > -1
    ) {
      setbrowserAgent("Internet Explorer");
    } else if (userAgent.indexOf("Brave")) {
      setbrowserAgent("Brave");
    }
  }, []);

  return { browserAgent };
};

export default useBrowserAgent;
