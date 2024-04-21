import React, { useEffect, useState } from "react";
import { dexie_db } from "../dexie_db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { userInfo_store } from "../store/userInfo_store";

const useRetrievePrvkey = () => {
  const [key, setkey] = useState<string | null>(null);
  const { id, setUserInfo } = userInfo_store();

  const setPrvKey2Store = async () => {
    // -------------------------------------------------------------------
    // | check using userId & store the corresponding private key
    // | need to fetch userId from userInfo store to make checking process
    // -------------------------------------------------------------------
    const retrieveKeys = await dexie_db.key_table.toArray();
    console.log("Start retrieving prvKey from indexed db.");
    const keyData = retrieveKeys?.filter((i) => i.userId == id);
    if (keyData && keyData.length > 0) {
      // console.log("key data exists: ", keyData);
      const prvKey = keyData[0].key;
      setUserInfo({ rsa_private_key: prvKey });
      // setkey(prvKey);
    }
  };

  useEffect(() => {
    setPrvKey2Store();
  }, [id]);

  // return { prvKey: key };
};

export default useRetrievePrvkey;
