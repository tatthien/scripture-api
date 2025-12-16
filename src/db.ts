import { Database } from "bun:sqlite";

export const db = new Database("./scripture.db");

db.run("PRAGMA journal_mode = WAL");
