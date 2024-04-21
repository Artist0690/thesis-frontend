import React from "react";
import axios from "../api/axios";
import z from "zod";
import { userInfo_store } from "../store/userInfo_store";

const useRefresh = () => {
  const { setUserInfo } = userInfo_store();

  const refresh = async () => {
    const response = await axios.get("auth/refresh", { withCredentials: true });
    if (response.status === 200) {
      const zSchema = z.object({ accessToken: z.string() });
      const zCheck = zSchema.safeParse(response.data);
      if (zCheck.success) {
        setUserInfo(zCheck.data);
      }
    }
  };

  return refresh;
};

export default useRefresh;
