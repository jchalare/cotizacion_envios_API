import { Pool } from "pg";
import { envs } from "./envs";

export const pool = new Pool({
  user: envs.dbUser,
  host: envs.dbHost,
  database: envs.dbDatabase,
  password: envs.dbPassword,
  port: envs.dbPort,
  max: 20, // Máximo de clientes en el pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

console.log("✅ [DATABASE] Connection pool created successfully");

pool.on("connect", () => {
  console.log("✅ [DATABASE] New client connected to PostgreSQL pool.");
});

pool.on("error", (err: Error, client: any) => {
  console.error("❌ [DATABASE] Unexpected error on idle client:", err);
  process.exit(1);
});

pool.on("remove", (client) => {
  console.log("📊 [DATABASE] Client removed from pool");
});
