const Sequelize = require("sequelize");
const crypto = require("crypto");
const mysql = require("mysql2/promise");
const nanoid = require("nanoid");
require("dotenv").config();

// koneksi
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const sequelize = new Sequelize("sleep_well", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

//fungsi create user baru
async function createUser(userData) {
  try {
    // ambil data dari userdata
    const { username, name, email, password, birthdate, gender, google_id } =
      userData;
    const userId = nanoid(21);
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Format 'YYYY-MM-DD HH:MM:SS'
    // simpan user ke db
    await sequelize.query(
      `INSERT INTO users (id, username, name, email, password, birthdate, gender, google_id, createdAt, updatedAt) VALUES ('${userId}', '${username}', '${name}', '${email}', '${password}', '${birthdate}', '${gender}', '${google_id}', '${currentDate}', '${currentDate}')`
    );

    // ambil user yang baru dibuat
    const [newUser] = await sequelize.query(
      `SELECT * FROM users WHERE id = '${userId}'`
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
    const [allUsers] = await sequelize.query("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
}
//fungsi untuk mencari user berdasarkan id
async function getUserById(userId) {
  try {
    const [userById] = await sequelize.query(
      `SELECT * FROM users WHERE id = '${userId}'`
    );
    return userById;
  } catch (error) {
    return [];
  }
}
// fungsi untuk mencari user dengan email
async function getUserByEmail(email) {
  try {
    const [userByEmail] = await sequelize.query(
      `SELECT * FROM users WHERE email = '${email}'`
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

    await sequelize.query(
      `UPDATE users SET name = '${name}', birthdate = '${birthdate}', gender = '${gender}', updatedAt = '${currentDate}' WHERE id = '${userId}'`
    );
    const [updatedData] = await sequelize.query(
      `SELECT id, name, birthdate, gender, updatedAt FROM users WHERE id = '${userId}'`
    );
    return updatedData;
  } catch (error) {
    return null;
  }
}
// fungsi update password
async function updateUserPassword(userId, hashedPassword) {
  try {
    const result = await sequelize.query(
      `UPDATE users SET password = '${hashedPassword}' WHERE id = '${userId}'`
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

async function postArticle(userId, title, image, body) {
  const id = nanoid(21);

  try {
    await sequelize.query(
      `INSERT INTO articles (id, userId, title, image, body) VALUES ('${id}', '${userId}', '${title}', '${image}', '${body}')`
    );
    // Periksa apakah query berhasil memperbarui baris
    const check = await sequelize.query(
      `SELECT * FROM articles WHERE id = '${id}'`
    );

    return check;
  } catch (error) {
    return null;
  }
}

async function getArticleById(id) {
  try {
    const result = await sequelize.query(
      `SELECT * FROM articles WHERE id = '${id}'`
    );

    return result;
  } catch (error) {
    return null;
  }
}

async function getCommentById(id) {
  try {
    const result = await sequelize.query(
      `SELECT * FROM comments WHERE id = '${id}'`
    );

    return result;
  } catch (error) {
    return null;
  }
}

async function getUserIdByCommentId(id) {
  try {
    const result = await sequelize.query(
      `SELECT userId FROM comments WHERE id = '${id}'`
    );

    return result[0][0];
  } catch (error) {
    return null;
  }
}

async function getUserIdByArticleId(id) {
  try {
    const result = await sequelize.query(
      `SELECT userId FROM articles WHERE id = '${id}'`
    );

    return result[0][0];
  } catch (error) {
    return null;
  }
}

async function deleteArticleById(id) {
  try {
    await sequelize.query(`DELETE FROM comments WHERE articleId = '${id}'`);

    const result = await sequelize.query(
      `DELETE FROM articles WHERE id = '${id}'`
    );

    return result;
  } catch (error) {
    return null;
  }
}

async function getCommentByArticleId(id) {
  try {
    const result = await sequelize.query(
      `SELECT * FROM comments WHERE articleId = '${id}'`
    );

    return result;
  } catch (error) {
    return null;
  }
}

async function postComment(userId, articleId, body) {
  const id = nanoid(21);
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Format 'YYYY-MM-DD HH:MM:SS'

  try {
    await sequelize.query(
      `INSERT INTO comments (id, userId, articleId, body, createdAt, updatedAt) VALUES ('${id}', '${userId}', '${articleId}', '${body}', '${currentDate}', '${currentDate}')`
    );

    const result = await sequelize.query(
      `SELECT * FROM comments WHERE id = '${id}'`
    );

    return result;
  } catch (error) {
    return null;
  }
}

async function deleteCommentById(commentId) {
  try {
    const result = await sequelize.query(
      `DELETE FROM comments WHERE id = '${commentId}'`
    );

    return result;
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
  postArticle,
  getArticleById,
  getCommentByArticleId,
  getCommentById,
  getUserIdByCommentId,
  deleteCommentById,
  getUserIdByArticleId,
  deleteArticleById,
  postComment,
};
