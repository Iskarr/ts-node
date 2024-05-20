import { Pool } from "pg";
import { DATABASE_URL } from "./config/config";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

export default pool;
