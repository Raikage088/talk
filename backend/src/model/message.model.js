import { db } from "../config/db.config";

const promiseDb = db.promise();

export const Message = {
  createMessage: async (payload) => {
    try {
      const mysql = `INSERT INTO message (sender_id, receiver_id, message_text, image_url) VALUES (?, ?, ?, ?)`;

      const [result] = await promiseDb.execute(mysql, [
        payload.sender_id,
        payload.receiver_id,
        payload.message_text || null,
        payload.image_url || null,
      ]);

      return { message_id: result.insertId, ...payload };
    } catch (error) {
      throw new Error(`Error creating message: ${error.message}`);
    }
  },

  getConversation: async (userId1, userId2, limit = 50) => {
    try {
      const mysql = `SELECT * FROM message WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at ASC LIMIT ?`;

      const [rows] = await promiseDb.execute(mysql, [
        userId1,
        userId2,
        userId2,
        userId1,
        String(limit),
      ]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching conversation: ${error.message}`);
    }
  },
  markedAsRead: async (receiverId, messageId) => {
    try {
      const mysql = `UPDATE message SET is_read = 1 WHERE receiver_id = ? AND message_id = ?`;

      const [result] = await promiseDb.execute(mysql, [receiverId, messageId]);

      return result.affectedRows > 0; // Return true if the message was marked as read, otherwise false
    } catch (error) {
      throw new Error(`Error marking message as read: ${error.message}`);
    }
  },
};
