import fs from "fs";
import path from "path";
import pool from "../config/db";
import dotenv from "dotenv";

dotenv.config();

async function runMigrations() {
  const client = await pool.connect();
  try {
    const migrationFile = path.join(__dirname, "001_users.sql");
    const sql = fs.readFileSync(migrationFile, "utf-8");
    await client.query(sql);
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();
