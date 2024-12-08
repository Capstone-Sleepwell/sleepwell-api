const { loadModel } = require("../services/loadModel");

const getHomeHandler = async (request, h) => {
  return h.response({
    status: "success",
    message: "Berhasil membuka home !",
  });
};

const postPredictHandler = async (request, h) => {
  const {
    sleepDuration,
    awakenings,
    stayAwake,
    age,
    gender,
    cafeine,
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
    const article = "Pertahankan kualitas tidurmu dengan ...";

    return h.response({
      status: "success",
      message: "Berhasil memprediksi !",
      data: {
        percentage: percentage,
        label: "Kualitas tidurmu sudah bagus.",
        article: article,
      },
    });
  }

  if (
    age.length <= 0 ||
    gender.length <= 0 ||
    cafeine.length <= 0 ||
    alcohol.length <= 0 ||
    smoking.length <= 0 ||
    exercise.length <= 0
  ) {
    return h.response({
      status: "fail",
      message: "Gagal memprediksi, pastikan inputan sudah benar !",
    });
  }

  const prediction = await loadModel({
    age,
    gender,
    cafeine,
    alcohol,
    smoking,
    exercise,
  });

  const result = "";
  let suggestion = "";
  if (Math.round(prediction * 100) < 33) {
    if (cafeine > 0) {
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

    result = `Berdasarkan inputan umur, jenis kelamin, kafein, alkohol, merokok, olahraga, mungkin mempengaruhi kualitas tidur. ${suggestion} Kemungkinan ada penyebab lain selain inputan.`;
  } else if (Math.round(prediction * 100) < 66) {
    if (cafeine > 0) {
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

    result = `Berdasarkan inputan umur, jenis kelamin, kafein, alkohol, merokok, olahraga, mungkin mempengaruhi kualitas tidur. ${suggestion} Kemungkinan ada penyebab lain selain inputan.`;
  } else if (Math.round(prediction * 100) > 66) {
    result =
      "Berdasarkan inputan umur, jenis kelamin, kafein, alkohol, merokok, olahraga, inputan tidak mempengaruhi kualitas tidur.";
  } else {
    result = "Hasill tidak dikenali label !";
  }

  return h.response({
    status: "success",
    message: "Berhasil memprediksi !",
    data: {
      label: result,
      percentage: Math.round(prediction * 100),
    },
  });
};

module.exports = { getHomeHandler, postPredictHandler };
