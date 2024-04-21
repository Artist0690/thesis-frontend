import React, { useEffect, useState } from "react";
import { userInfo_store } from "../store/userInfo_store";
import useRefresh from "../hooks/useRefresh";
import { axiosPrivate } from "../api/axios";

const TestSomething = () => {
  const { accessToken } = userInfo_store();

  const refresh = useRefresh();

  useEffect(() => {
    refresh();
  }, []);

  useRefresh();
  const handleClick = () => {
    refresh();
    console.log(accessToken);
  };

  const handleTest = async () => {
    console.log("Now i'm trying with this token: ", accessToken);
    axiosPrivate
      .get("chats/test_something", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      test something
      <button
        className="bg-zinc-500 text-white p-3"
        onClick={() => handleClick()}
      >
        click
      </button>
      <button className="bg-green-300 p-3 " onClick={() => handleTest()}>
        test
      </button>
    </div>
  );
};

export default TestSomething;
