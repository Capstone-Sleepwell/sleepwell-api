const { predict } = require("../services/predict.js");
const { addPredictResult, getPredictByUserId, deleteHistory } = require('../dbconfig/db.js');

const getHomeHandler = async (request, h) => {
  return h.response({
    status: "success",
    message: "Berhasil membuka home !",
  });
};

const postPredictHandler = async (request, h) => {
  try {
    const { model } = request.server.app;
    const userId = request.auth.credentials.id;
  
  const {
    sleepDuration,
    awakenings,
    stayAwake,
    age,
    gender,
    caffeine,
    alcohol,
    smoking,
    exercise,
  } = request.payload;

  if (
    sleepDuration >= 7 &&
    sleepDuration <= 8 &&
    awakenings <= 2 &&
    (sleepDuration - stayAwake) / sleepDuration >= 0.8
  ) {
    const percentage = 100;
    const label = "Kualitas tidurmu sudah bagus.";
    const suggestion = "Pertahankan pola tidurmu ya!";

    // masukan ke db
    // dapetin hasil prediksi
    const result = await addPredictResult({
      userId: userId,
      label: label,
      prediction: percentage,
      suggestion: suggestion,
    });
    // return di front end
    return h.response({
      status: "success",
      message: "Berhasil memprediksi !",
      data: result[0]
    }).code(201);
  }

  if (
    age.length <= 0 ||
    gender.length <= 0 ||
    caffeine.length <= 0 ||
    alcohol.length <= 0 ||
    smoking.length <= 0 ||
    exercise.length <= 0
  ) {
    return h.response({
      status: "fail",
      message: "Gagal memprediksi, pastikan inputan sudah benar !",
    }).code(422);
  }

  const predictions = await predict(model, {
    age,
    gender,
    caffeine,
    alcohol,
    smoking,
    exercise,
  });

  const prediction = Math.round(predictions);

  let result = "";
  let label = "";
  let suggestion = "";
  if (prediction < 33) {
    label = "Kemungkinan kualitas tidur buruk";
    if (caffeine > 0) {
      suggestion = "Kurangi mengkonsumsi kafein";
    }

    if (alcohol > 0) {
      if (suggestion.length > 0) {
        suggestion = suggestion + ", kurangi mengkonsumsi alcohol";
      } else {
        suggestion = "Kurangi mengkonsumsi alcohol";
      }
    }

    if (smoking > 0) {
      if (suggestion.length > 0) {
        suggestion = suggestion + ", kurangi pengkonsumsian rokok";
      } else {
        suggestion = "Kurangi pengkonsumsian rokok";
      }
      suggestion = "Kurangi pengkonsumsian rokok";
    }

    if (exercise <= 0) {
      if (suggestion.length > 0) {
        suggestion = suggestion + ", perbanyak olahraga";
      } else {
        suggestion = "Perbanyak olahraga";
      }
    }

    if (suggestion.length > 0) {
      result = `Berdasarkan inputan umur, jenis kelamin, kafein, alkohol, merokok, olahraga, mungkin mempengaruhi kualitas tidur. ${suggestion}. Kemungkinan ada penyebab lain selain inputan.`;
    } else {
      result = `Berdasarkan inputan umur, jenis kelamin, kafein, alkohol, merokok, olahraga, mungkin mempengaruhi kualitas tidur. Kemungkinan ada penyebab lain selain inputan.`;
    }
  } else if (prediction < 66) {
    label = "Kemungkinan kualitas tidur kurang baik";
    if (caffeine > 0) {
      suggestion = "Kurangi mengkonsumsi kafein";
    }

    if (alcohol > 0) {
      if (suggestion.length > 0) {
        suggestion = suggestion + ", kurangi mengkonsumsi alcohol";
      } else {
        suggestion = "Kurangi mengkonsumsi alcohol";
      }
    }

    if (smoking > 0) {
      if (suggestion.length > 0) {
        suggestion = suggestion + ", kurangi pengkonsumsian rokok";
      } else {
        suggestion = "Kurangi pengkonsumsian rokok";
      }
      suggestion = "Kurangi pengkonsumsian rokok";
    }

    if (exercise <= 0) {
      if (suggestion.length > 0) {
        suggestion = suggestion + ", perbanyak olahraga";
      } else {
        suggestion = "Perbanyak olahraga";
      }
    }

    if (suggestion.length > 0) {
      result = `Berdasarkan inputan umur, jenis kelamin, kafein, alkohol, merokok, olahraga, mungkin mempengaruhi kualitas tidur. ${suggestion}. Kemungkinan ada penyebab lain selain inputan.`;
    } else {
      result = `Berdasarkan inputan umur, jenis kelamin, kafein, alkohol, merokok, olahraga, mungkin mempengaruhi kualitas tidur. Kemungkinan ada penyebab lain selain inputan.`;
    }
  } else if (prediction > 66) {
    label = "Kemungkinan kualitas tidur baik";
    result =
      "Berdasarkan inputan umur, jenis kelamin, kafein, alkohol, merokok, olahraga, inputan tidak mempengaruhi kualitas tidur. Kemungkinan ada penyebab lain selain inputan.";
  } else {
    result = "Hasill tidak dikenali label !";
  }
  // masukan ke db
  // dapetin hasil prediksi
  const result2 = await addPredictResult({
    userId: userId,
    label: label,
    prediction: prediction,
    suggestion: result,
  })
  // balikin respons
  return h.response({
    status: "success",
    message: "Berhasil memprediksi !",
    data: result2[0]
  }).code(201);
  } catch(error) {
    console.log("Error: ", error.message)
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
        data: user,
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

const getHistoriesHandler = async (request, h) => {
  try {
    // Ambil userId dari token JWT
    const userId = request.auth.credentials.id;
    // query
    const histories = await getPredictByUserId(userId);
    // cek
    if (histories.length === 0) {
      return h.response({
        status: "success",
        message: "Tidak ada histori prediksi ditemukan.",
        data: [],
      }).code(200);
    }
    // Balikin data histori ke front-end
    return h.response({
      status: "success",
      data: histories,
    }).code(200);

  } catch (error) {
    console.error("Error fetching histories:", error.message);
    // Handle error
    return h.response({
      status: "fail",
      message: "Gagal mengambil histori prediksi.",
    }).code(500);
  }
}

const deleteHistoryHandler = async (request, h) => {
  try {
    // ambil userId dari token JWT
    const userId = request.auth.credentials.id;
    // ambil predictId dari parameter
    const { predictId } = request.params;
    // validasi predictId
    if (!predictId) {
      return h.response({
        status: "fail",
        message: "PredictId harus disertakan.",
      }).code(400);
    }
    // hapus dari db
    const rowsDeleted = await deleteHistory(userId, predictId);
    // cek apakah ada baris yg dihapus
    if (rowsDeleted === 0) {
      return h.response({
        status: "fail",
        message: "Histori prediksi tidak ditemukan.",
      }).code(404);
    }
    // jika ada maka
    return h.response({
      status: "success",
      message: "Histori prediksi berhasil dihapus.",
    }).code(200);

  } catch (error) {
    console.error("Error deleting history:", error.message);
    return h.response({
      status: "fail",
      message: "Gagal menghapus histori prediksi.",
    }).code(500);
  }
}

module.exports = { getHomeHandler, postPredictHandler, 
  getUserHandler, getHistoriesHandler, deleteHistoryHandler };
