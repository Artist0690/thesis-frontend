import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import z, { string } from "zod";
import { userInfo_store, UserInfoSchema } from "../store/userInfo_store";
import { retrievePrvKey_controller } from "../controllers/retrievePrvKey_controller";

const useGainAccess = () => {
  const [userId, setuserId] = useState<string | null>(null);

  const navigate = useNavigate();

  // store
  const { setUserInfo } = userInfo_store();

  const checkGainAccess = async () => {
    axios
      .get("/auth/check")
      .then((response) => {
        const Zcheck = UserInfoSchema.omit({ rsa_private_key: true }).safeParse(
          response.data
        );
        if (!Zcheck.success) {
          console.log("User Info Type Mismatch.");
          return;
        }
        setUserInfo(Zcheck.data);
        setuserId(Zcheck.data._id);
      })
      .catch((error) => {
        console.log("Login required.");
        // redirect to login page
        navigate("/signin");
      });
  };

  useEffect(() => {
    console.log("we check use gain access 1️⃣");
    checkGainAccess();
  }, []);

  return { id: userId };
};

export default useGainAccess;
