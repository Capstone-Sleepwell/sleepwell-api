const Sequelize = require("sequelize");
const crypto = require("crypto");
const mysql = require('mysql2/promise');
require("dotenv").config();

// koneksi
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

function generateRandomId() {
  return crypto.randomBytes(5).toString("hex");
}

//fungsi create user baru
async function createUser(userData) {
  try {
    // ambil data dari userdata
    const { name, email, password, birthdate, gender, google_id } = userData;
    const userId = generateRandomId();
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Format 'YYYY-MM-DD HH:MM:SS'
    // simpan user ke db
    await db.query(
      "INSERT INTO users (id, name, email, password, birthdate, gender, google_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [userId, name, email, password, birthdate, gender, google_id, currentDate, currentDate]
    );

    // ambil user yang baru dibuat
    const [newUser] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );
    // return data user
    return newUser[0];
  } catch (error) {
    throw error;
  }
}
// fungsi untuk mengambil seluruh data user
async function getAllUsers() {
  try {
    const [allUsers] = await db.query("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
}
//fungsi untuk mencari user berdasarkan id
async function getUserById(userId) {
  try {
    const [userById] = await db.query(
      `SELECT * FROM users WHERE id = ?`,
      [userId]
    );
    return userById;
  } catch (error) {
    return [];
  }
}
// fungsi untuk mencari user dengan email
async function getUserByEmail(email) {
  try {
    const [userByEmail] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return userByEmail[0];
  } catch (error) {
    return null;
  }
}
// fungsi untuk mengedit data user berdasarkan id
async function editUserById(userData) {
  try {
    const { userId, name, birthdate, gender } = userData;
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Format 'YYYY-MM-DD HH:MM:SS'

    await db.query(
      "UPDATE users SET name = ?, birthdate = ?, gender = ?, updatedAt = ? WHERE id = ?",
      [name, birthdate, gender, currentDate, userId]
    );
    const [updatedData] = await db.query(
      "SELECT id, name, birthdate, gender, updatedAt FROM users WHERE id = ?",
      [userId]
    );
    return updatedData;
  } catch (error) {
    return null;
  }
}
// fungsi update password
async function updateUserPassword(userId, hashedPassword) {
  try {
    const result = await db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, userId]
    );
    // Periksa apakah query berhasil memperbarui baris
    if (result[0].affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return null;
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
  editUserById,
  updateUserPassword,
};
