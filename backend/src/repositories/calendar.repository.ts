import pool from "../config/db";

export interface CalendarConnection {
  id: number;
  user_id: string;
  access_token: string | null;
  refresh_token: string | null;
  token_expiry: Date | null;
  connected: boolean;
  created_at: Date;
  updated_at: Date;
}

export const calendarRepository = {
  async getConnection(userId: string): Promise<CalendarConnection | null> {
    const result = await pool.query(
      "SELECT * FROM calendar_connections WHERE user_id = $1",
      [userId]
    );
    return result.rows[0] || null;
  },

  async saveConnection(
    userId: string,
    accessToken: string,
    refreshToken: string,
    tokenExpiry: Date
  ): Promise<CalendarConnection> {
    const result = await pool.query(
      `INSERT INTO calendar_connections (user_id, access_token, refresh_token, token_expiry, connected)
       VALUES ($1, $2, $3, $4, true)
       ON CONFLICT (user_id) DO UPDATE SET
         access_token = $2, refresh_token = $3, token_expiry = $4, connected = true, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [userId, accessToken, refreshToken, tokenExpiry]
    );
    return result.rows[0];
  },

  async updateTokens(
    userId: string,
    accessToken: string,
    tokenExpiry: Date
  ): Promise<void> {
    await pool.query(
      `UPDATE calendar_connections SET access_token = $2, token_expiry = $3, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1`,
      [userId, accessToken, tokenExpiry]
    );
  },

  async disconnect(userId: string): Promise<void> {
    await pool.query(
      `UPDATE calendar_connections SET connected = false, access_token = null, refresh_token = null, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1`,
      [userId]
    );
  },
};
