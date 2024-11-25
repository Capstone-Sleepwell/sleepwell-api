const Sequelize = require('sequelize');
const crypto = require('crypto');
require('dotenv').config();

// koneksi
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

function generateRandomId() {
    return crypto.randomBytes(5).toString('hex');
}
// koneksi
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Koneksi Berhasil!');
    } catch (error) {
        console.log('Koneksi Gagal!');
    }
};
// fungsi create user baru
async function createUser(userData) {
    try {
        // user_id
        const userId = generateRandomId();
        userData.user_id = userId;
        // simpan user ke db
        await sequelize.query(
            'INSERT INTO users (user_id, user_name, user_email, user_password, user_birthdate, user_gender, google_id) VALUES (:user_id, :name, :email, :password, :birthday, :gender, :google_id)', 
            {
                replacements: userData,
            }
        );

        // ambil user yang baru dibuat
        const [newUser] = await sequelize.query('SELECT * FROM users WHERE user_id = :id', 
            {
                replacements: { id: userId },
            }
        );
        // return data user 
        return newUser[0];
    } catch (error) {
        throw error;
    }
};
// fungsi untuk mengambil seluruh data user
async function getAllUsers() {
    try {
        await connectDB();
        // tampilkan seluruh user
        const [allUsers] = await sequelize.query('SELECT * FROM users');
        return allUsers;
    } catch (error) {
        return error;
    }
};
//fungsi untuk mencari user berdasarkan id
async function getUserById(userId) {
    try {
        await connectDB();
        // user
        const [userById] = await sequelize.query(`SELECT * FROM users WHERE user_id = :userId`, {
            replacements: { userId },
        });
        return userById;
    } catch (error) {
        return [];
    }
};
// fungsi untuk mencari user dengan email
async function getUserByEmail(email) {
    try {
        // kueri
        const [userByEmail] = await sequelize.query('SELECT * FROM users WHERE user_email = :email',
            {
                replacements: { email },
            }
        );
        return userByEmail[0];
    } catch (error) {
        return null;
    }
};
// fungsi untuk mengedit data user berdasarkan id
async function editUserById(userData) {
    try {
        await connectDB();
        // kueri
        await sequelize.query(
            'UPDATE users SET user_name = :user_name, user_birthdate = :user_birthdate, user_gender = :user_gender WHERE user_id = :userId',
            {
                replacements: userData,
            }
        );
        const [updatedData] = await sequelize.query(
            'SELECT user_id, user_name, user_birthdate, user_gender FROM users WHERE user_id = :userId',
            {
                replacements: { userId: userData.userId }
            }
        );
        return updatedData;
    } catch (error) {
        return null;
    }
}
// fungsi update password
async function updateUserPassword(userId, hashedPassword) {
    try {
        await connectDB();
        console.log(`Mencoba mengupdate password untuk user_id: ${userId}`);
        // kueri
        const result = await sequelize.query(
            'UPDATE users SET user_password = :hashedPassword WHERE user_id = :userId',
            {
                replacements: { userId, hashedPassword }
            }
        );
        console.log("Hasil update:", result);
        // Periksa apakah query berhasil memperbarui baris
        if (result[0].affectedRows > 0) {
            console.log("Password berhasil diperbarui!");
            return true;
        } else {
            console.log("Tidak ada perubahan pada database!");
            return false;
        }
    } catch (error) {
        return null;
    }
}
module.exports = { getAllUsers, getUserById, createUser, getUserByEmail, editUserById, updateUserPassword };