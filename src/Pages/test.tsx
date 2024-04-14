import React, { useEffect, useState } from "react";
import { dexie_db } from "../dexie_db/db";
import { useLiveQuery } from "dexie-react-hooks";
import z from "zod";

const TestSomething = () => {
  // const zKeySchema = z.array(
  //   z.object({
  //     id: z.number(),
  //     userId: z.string(),
  //     key: z.string(),
  //   })
  // );

  // type Keys = z.infer<typeof zKeySchema>;

  // const [keys, setkeys] = useState<Keys | null>(null);

  // const allKeys = async () => await dexie_db.privateKey.toArray();

  // const retrieveKeys = useLiveQuery(allKeys);

  // const addNewKey = async () => {
  //   try {
  //     const id = await dexie_db.privateKey.add({ key: "1234", userId: "1234" });
  //     console.log(id);
  //     console.log(retrieveKeys);
  //     // const zKeyCheck = zKeySchema.safeParse(retrieveKeys);
  //     // if (zKeyCheck.success) {
  //     //   setkeys(zKeyCheck.data);
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   addNewKey();
  // }, []);

  return <div>test something</div>;
};

export default TestSomething;
