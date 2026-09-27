import pool from "../config/db";

export interface User {
  id: number;
  descope_user_id: string;
  email: string | null;
  name: string | null;
  created_at: Date;
  updated_at: Date;
}

export const userRepository = {
  async findOrCreate(descopeUserId: string, email?: string, name?: string): Promise<User> {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE descope_user_id = $1",
      [descopeUserId]
    );

    if (existingUser.rows.length > 0) {
      // Update user info if changed
      const updated = await pool.query(
        `UPDATE users SET email = COALESCE($2, email), name = COALESCE($3, name), updated_at = CURRENT_TIMESTAMP 
         WHERE descope_user_id = $1 RETURNING *`,
        [descopeUserId, email, name]
      );
      return updated.rows[0];
    }

    const newUser = await pool.query(
      `INSERT INTO users (descope_user_id, email, name) VALUES ($1, $2, $3) RETURNING *`,
      [descopeUserId, email, name]
    );
    return newUser.rows[0];
  },

  async findByDescopeId(descopeUserId: string): Promise<User | null> {
    const result = await pool.query(
      "SELECT * FROM users WHERE descope_user_id = $1",
      [descopeUserId]
    );
    return result.rows[0] || null;
  },
};
