import React from "react";
import { dexie_db } from "../dexie_db/db";
import { useLiveQuery } from "dexie-react-hooks";

const useRetrievePrvkey = () => {
  // retrieve private key from indexed db
  const fn = async () => dexie_db.key_table.toArray();
  const retrieveKeys = useLiveQuery(fn);
  console.log(retrieveKeys);
};

export default useRetrievePrvkey;
