import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import z, { string } from "zod";
import { accessToken_store } from "../store/accessToken_store";

const useGainAccess = () => {
  const Zschema = z.object({
    accessToken: z.string(),
  });

  type Props = z.infer<typeof Zschema>;

  const navigate = useNavigate();

  // store
  const { setAccessToken } = accessToken_store();

  const checkGainAccess = async () => {
    try {
      const response = await axios.get("/auth/refresh");
      const Zcheck = Zschema.safeParse(response.data);
      if (Zcheck.success) {
        setAccessToken(Zcheck.data.accessToken);
      }
    } catch (error) {
      console.log("Login required.");
      // redirect to login page
      navigate("/login");
    }
  };

  useEffect(() => {
    checkGainAccess();
  }, []);

  return { message: "ok" };
};

export default useGainAccess;
