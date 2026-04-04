import { db } from "../config/db.config.js";

const promiseDb = db.promise();

export const User = {
  createUser: async (newUser) => {
    try {
      const mysql = `INSERT INTO user (username, password, lastName, firstName, middleInitial) VALUES (?, ?, ?, ?, ?)`;

      const [rows] = await promiseDb.execute(mysql, [
        newUser.username,
        newUser.password,
        newUser.lastName,
        newUser.firstName,
        newUser.middleInitial || null,
      ]);

      return { user_id: rows.insertId, ...newUser };
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  getUserByUsername: async (username) => {
    try {
      const mysql = `SELECT * FROM user WHERE username = ?`;

      const [rows] = await promiseDb.execute(mysql, [username]);

      return rows.length > 0 ? rows[0] : null; // Return the user object if found, otherwise return null
    } catch (error) {
      throw new Error(`Error fetching user by username: ${error.message}`);
    }
  },

  getUserById: async (user_id) => {
    try {
      const mysql = `SELECT user_id, lastName, firstName, middleInitial FROM user WHERE user_id = ?`;

      const [rows] = await promiseDb.execute(mysql, [user_id]);
      return rows.length > 0 ? rows[0] : null; // Return the user object if found, otherwise return null
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  },

  isUsernameTaken: async (username) => {
    try {
      const mysql = `SELECT COUNT(*) AS count FROM user WHERE username = ?`;

      const [rows] = await promiseDb.execute(mysql, [username]);

      return rows[0].count > 0; // Return true if username is taken, otherwise false
    } catch (error) {
      throw new Error(`Error checking username availability: ${error.message}`);
    }
  },
};
