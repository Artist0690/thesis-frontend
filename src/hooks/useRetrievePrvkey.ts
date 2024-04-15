import React, { useEffect } from "react";
import { dexie_db } from "../dexie_db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { userInfo_store } from "../store/userInfo_store";

const useRetrievePrvkey = () => {
  const { id, setUserInfo } = userInfo_store();
  // retrieve private key from indexed db
  const fn = async () => await dexie_db.key_table.toArray();
  const retrieveKeys = useLiveQuery(fn, []);
  console.log(retrieveKeys);

  const setPrvKey2Store = () => {
    // check using userId & store the corresponding private key
    // need to fetch userId from store to make checking process
    console.log("Start retrieving prvKey from indexed db.");
    const keyData = retrieveKeys?.filter((i) => i.userId == id);
    if (keyData && keyData.length > 0) {
      console.log("key data exists: ", keyData);
      const prvKey = keyData[0].key;
      setUserInfo({ rsa_private_key: prvKey });
    }
  };

  useEffect(() => {
    console.log("use effect!");
    // start storing private key to global state
    setPrvKey2Store();
  }, []);
};

export default useRetrievePrvkey;
