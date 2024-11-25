const {
  Connection,
  getUserByEmail,
  createUser,
  editUserById,
  updateUserPassword,
} = require("../dbconfig/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//const users = Datastore.create('Users.db');
const allowedDomains = ["gmail.com"];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dateObj = new Date();
const month = dateObj.getMonth() + 1; // months from 1-12
const day = dateObj.getDate();
const year = dateObj.getFullYear();
const date = year + "/" + month + "/" + day;

const getHomeHandler = (request, h) => {
  return h.response({
    status: "success",
    message: "HI",
  });
};

const getUsersHandler = async (request, h) => {
  try {
    // get all user from db
    const users = await Connection.getAllUsers();
    return h
      .response({
        status: "success",
        data: users,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: "fail",
        message: error.message,
      })
      .code(500);
  }
};

const getUserHandler = async (request, h) => {
  try {
    // Data user dari validasi token JWT
    const user = request.auth.credentials;
    // Kembalikan data profile user
    return h
      .response({
        status: "success",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          birthDate: user.birthdate,
          gender: user.gender,
        },
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: "fail",
        message: error.message,
      })
      .code(500);
  }
};

const editUserHandler = async (request, h) => {
  try {
    // Data user dari validasi token jwt
    const user = request.auth.credentials;
    // Dapatkan data dari user
    const { name, birthday, gender } = request.payload;
    // update
    const editedUser = await editUserById({
      name: name,
      birthdate: birthday,
      gender: gender,
      userId: user.id,
      updatedAt: date,
    });
    // response
    return h
      .response({
        status: "success",
        message: "Data berhasil diubah",
        data: editedUser,
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        status: "fail",
        message: error.message,
      })
      .code(500);
  }
};

const addUserHandler = async (request, h) => {
  try {
    // Dapatkan data user dari payload
    const { name, email, password, gender, birthday } = request.payload;
    // pastikan semua data terisi
    if (!name || !email || !password || !gender || !birthday) {
      return h
        .response({
          status: "fail",
          message: "Data tidak boleh kosong!",
        })
        .code(422);
    }
    // verivikasi email
    if (!emailRegex.test(email)) {
      return h
        .response({
          status: "fail",
          message: "Format email tidak valid!",
        })
        .code(422);
    }
    // Ekstrak domain email
    const emailDomain = email.split("@")[1];
    // Validasi domain email
    if (!allowedDomains.includes(emailDomain)) {
      return h
        .response({
          status: "fail",
          message: `Hanya email dengan domain berikut yang diperbolehkan: ${allowedDomains.join(
            ", "
          )}`,
        })
        .code(422);
    }
    // cek apakah email sudah ada di db
    const checkUserEmail = await getUserByEmail(email);
    if (checkUserEmail) {
      return h
        .response({
          status: "fail",
          message: "Email telah terdaftar! Silahkan Login",
        })
        .code(409);
    }
    // hased password
    const hasedPassword = await bcrypt.hash(password, 10);
    // masukan data ke database
    const newUser = await createUser({
      name: name,
      email: email,
      password: hasedPassword,
      birthday: birthday,
      gender: gender,
      google_id: null,
      createdAt: date,
      updatedAt: date,
    });
    // token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    // return
    return h
      .response({
        status: "success",
        message: `User Berhasil Dibuat, Selamat Datang ${name}!`,
        token,
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        status: "fail",
        message: error.message,
      })
      .code(500);
  }
};

const loginUserHandler = async (request, h) => {
  try {
    const { email, password } = request.payload;
    // jika email/pw blm di isi
    if (!email || !password) {
      return h
        .response({
          status: "fail",
          message: "Lengkapi kolom email dan password dahulu",
        })
        .code(422);
    }
    // cek email di db apakah sudah ada atau belum
    const user = await getUserByEmail(email);
    // jika user belum ada maka
    if (!user) {
      return h
        .response({
          status: "fail",
          message: "Email atau password tidak valid / tidak dikenal",
        })
        .code(401);
    }
    // cek password
    const passwordMatch = await bcrypt.compare(password, user.password);
    // jika email/password salah
    if (!passwordMatch) {
      return h
        .response({
          status: "fail",
          message: "Password tidak valid!",
        })
        .code(401);
    }
    // jika login sukses, generate token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    // return
    return h
      .response({
        status: "success",
        message: `Login Berhasil, Selamat Datang kembali ${user.name}`,
        token,
      })
      .code(200);
  } catch (err) {
    return h
      .response({
        status: "fail",
        message: err.message,
      })
      .code(500);
  }
};

const loginGoogleHandler = async (request, h) => {
  try {
    // ambil informasi profile dari google
    const profile = request.auth.credentials.profile;
    // cek user apakah sudah ada di database berdasarkan email
    const exsistingUser = await getUserByEmail(profile.email);
    // jika user ada maka
    if (exsistingUser) {
      // jika user sudah ada, buat token jwt
      const token = jwt.sign(
        {
          userId: exsistingUser.id,
          email: exsistingUser.email,
          name: exsistingUser.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );
      // response
      return h.response({
        status: "success",
        token,
        message: `Selamat Datang kembali ${exsistingUser.name}!`,
        id: exsistingUser.id,
      });
    }
    // jika user belum terdaftar, simpan data ke dalam database
    const newUser = await createUser({
      google_id: profile.id,
      name: profile.displayName,
      email: profile.email,
    });
    // buat token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        name: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    // response
    return h.response({
      status: "success",
      token,
      message: `Login Berhasil! Halo ${newUser.name}!`,
      id: newUser.id,
    });
  } catch (error) {
    return h
      .response({
        status: "fail",
        message: error.message,
      })
      .code(500);
  }
};

const addPasswordGoogleHandler = async (request, h) => {
  try {
    const { newPassword } = request.payload;
    // validasi apakah password kosong
    if (!newPassword) {
      return h
        .response({
          status: "fail",
          message: "Password tidak boleh kosong",
        })
        .code(422);
    }
    // validasi panjang karakter (minimal panjang 8)
    if (newPassword.length < 8) {
      return h
        .response({
          status: "fail",
          message: "Panjang karakter minimal 8",
        })
        .code(422);
    }
    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Ambil data pengguna dari JWT token
    const user = request.auth.credentials;
    console.log("Data dari JWT:", user);
    // Perbarui password di database
    const updateResult = await updateUserPassword(user.id, hashedPassword);

    // Jika tidak ada perubahan, beri respons gagal
    if (!updateResult) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui password! Pastikan id valid",
        })
        .code(500);
    }

    return h
      .response({
        status: "success",
        message: "Password berhasil diperbarui!",
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: "fail",
        message: error.message,
      })
      .code(500);
  }
};

module.exports = {
  getHomeHandler,
  getUsersHandler,
  getUserHandler,
  editUserHandler,
  addUserHandler,
  loginUserHandler,
  loginGoogleHandler,
  addPasswordGoogleHandler,
};
