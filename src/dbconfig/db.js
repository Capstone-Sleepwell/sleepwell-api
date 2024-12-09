const mysql = require("mysql2/promise");
const nanoid = require("nanoid");
const Sequelize = require('sequelize');
require("dotenv").config();
let db;

// // Koneksi DB
// async function initializeDB() {
//   try {
//     console.log("Initializing database connection...");
//     db = mysql.createPool({
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       database: process.env.DB_NAME,
//       socketPath: `/cloudsql/${process.env.DB_CONNECTION_NAME}`,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0,
//     });
//     console.log("Database connection established!");
//   } catch (error) {
//     console.error("Failed to initialize database connection:", error);
//     throw error;
//   }
// }

// initializeDB().catch((error) => {
//   console.error("Failed to initialize database connection:", error);
// });

// test mysql lokal
const sequelize = new Sequelize("sleep_well", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

// Fungsi mencari user berdasarkan id
async function getUserById(id) {
  try {
    console.log(`Querying user with ID: ${id}`);
    const [userById] = await sequelize.query(
      `SELECT * FROM users WHERE id = '${id}'`
    );
    console.log("User retrieved:", userById);
    return userById;
  } catch (error) {
    return [];
  }
}

// Fungsi menambahkan data hasil prediksi user
async function addPredictResult(predictData) {
  try {
    const { userId, label, prediction, suggestion } = predictData;
    
    const predictId = nanoid(21);
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await sequelize.query(
      `INSERT INTO predicts (predictId, userId, label, prediction, suggestion, createdAt)
       VALUES ('${predictId}', '${userId}', '${label}', '${prediction}', '${suggestion}', '${currentDate}')`
    );
    const result = await sequelize.query(
      `SELECT * 
      FROM predicts 
      WHERE userId = '${userId}' 
      AND predictId = '${predictId}'
      `)
    return result[0];
  } catch (error) {
    throw error;
  }
}

// Fungsi mengambil data histori prediksi berdasarkan userId
async function getPredictByUserId(userId) {
  try {
    const [predictHistories] = await sequelize.query(
      `SELECT * 
      FROM predicts 
      WHERE userId = '${userId}'
      ORDER BY createdAt DESC`
    );
    return predictHistories;
  } catch (error) {
    throw error;
  }
}

// Fungsi mengambil seluruh data histori prediksi (for debugging only)
async function getAllPredict() {
  try {
    const [allData] = await sequelize.query(`SELECT * FROM predicts`);
    return allData;
  } catch (error) {
    throw error;
  }
}

// Fungsi menghapus data histori berdasrakan prediksiId 
async function deleteHistory(userId, predictId) {
  try {
    const [result] = await sequelize.query(
      `DELETE FROM predicts 
      WHERE predictId = '${predictId}' 
      AND userId = '${userId}'`
    )
    // Return jumlah baris yang dihapus
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { getUserById, addPredictResult, getPredictByUserId, getAllPredict, deleteHistory };
