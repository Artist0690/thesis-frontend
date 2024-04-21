import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import z, { string } from "zod";
import { userInfo_store } from "../store/userInfo_store";
import { retrievePrvKey_controller } from "../controllers/retrievePrvKey_controller";

const useGainAccess = () => {
  const Zschema = z.object({
    accessToken: z.string(),
    id: z.string(),
    name: z.string(),
    email: z.string(),
  });

  type UserInfo = z.infer<typeof Zschema>;
  const [userId, setuserId] = useState<string | null>(null);

  const navigate = useNavigate();

  // store
  const { setUserInfo, id } = userInfo_store();

  const checkGainAccess = async () => {
    axios
      .get("/auth/check")
      .then((response) => {
        const Zcheck = Zschema.safeParse(response.data);
        if (Zcheck.success) {
          setUserInfo(Zcheck.data);
          setuserId(Zcheck.data.id);
        }
      })
      .catch((error) => {
        console.log("Login required.");
        // redirect to login page
        navigate("/login");
      });
  };

  useEffect(() => {
    checkGainAccess();
  }, []);

  return { id: userId };
};

export default useGainAccess;
