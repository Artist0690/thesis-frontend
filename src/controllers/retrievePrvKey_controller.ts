import axios from "../api/axios";
import { dexie_db } from "../dexie_db/db";
import { UserInfo, userInfo_store } from "../store/userInfo_store";

type Props = {
  userId: string;
  setKey: (payload: Partial<UserInfo>) => void;
};

export const retrievePrvKey_controller = async (payload: Props) => {
  const { setKey, userId } = payload;

  const prvKeyArr = await dexie_db.key_table.toArray();
  const keyData = prvKeyArr.filter((k) => k.userId == userId);
  if (keyData.length > 0) {
    const prvKey = keyData[0].key;
    setKey({ rsa_private_key: prvKey });
    console.log(prvKey);
  }
};
