import pool from "../config/db";
import { v4 as uuidv4 } from "uuid";

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: Date;
}

export const conversationRepository = {
  async create(userId: string, title?: string): Promise<Conversation> {
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO conversations (id, user_id, title) VALUES ($1, $2, $3) RETURNING *`,
      [id, userId, title || "New Conversation"]
    );
    return result.rows[0];
  },

  async findByUserId(userId: string): Promise<Conversation[]> {
    const result = await pool.query(
      `SELECT * FROM conversations WHERE user_id = $1 ORDER BY updated_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async findById(conversationId: string): Promise<Conversation | null> {
    const result = await pool.query(
      `SELECT * FROM conversations WHERE id = $1`,
      [conversationId]
    );
    return result.rows[0] || null;
  },

  async addMessage(
    conversationId: string,
    role: "user" | "assistant",
    content: string
  ): Promise<Message> {
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO messages (id, conversation_id, role, content) VALUES ($1, $2, $3, $4) RETURNING *`,
      [id, conversationId, role, content]
    );
    // Update conversation timestamp
    await pool.query(
      `UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [conversationId]
    );
    return result.rows[0];
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    const result = await pool.query(
      `SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC`,
      [conversationId]
    );
    return result.rows;
  },

  async updateTitle(conversationId: string, title: string): Promise<void> {
    await pool.query(
      `UPDATE conversations SET title = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [title, conversationId]
    );
  },

  async deleteConversation(conversationId: string): Promise<void> {
    await pool.query(`DELETE FROM conversations WHERE id = $1`, [conversationId]);
  },
};
