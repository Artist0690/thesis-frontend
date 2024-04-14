import Dexie, { Table } from "dexie";

export interface IndexedDb {
  id?: number;
  userId: string;
  key: string;
}

class Chatapp extends Dexie {
  key_table!: Table<IndexedDb>;

  constructor() {
    super("my_database");
    this.version(1).stores({ key_table: "++id, userId, key" });
  }
}

export const dexie_db = new Chatapp();
