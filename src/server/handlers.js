const nanoid = require("nanoid");
const { predict } = require("../services/predict");

const getHomeHandler = async (request, h) => {
  return h.response({
    status: "success",
    message: "Berhasil membuka home !",
  });
};

const postPredictHandler = async (request, h) => {
  const { model } = request.server.app;

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
    caffeine.length <= 0 ||
    alcohol.length <= 0 ||
    smoking.length <= 0 ||
    exercise.length <= 0
  ) {
    return h.response({
      status: "fail",
      message: "Gagal memprediksi, pastikan inputan sudah benar !",
    });
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

  const id = nanoid(32);
  const date = new Date().toISOString();
  const data = [id, date, prediction];

  return h.response({
    status: "success",
    message: "Berhasil memprediksi !",
    data: {
      label: label,
      suggestion: result,
      percentage: prediction + "%",
      data: data,
    },
  });
};

module.exports = { getHomeHandler, postPredictHandler };
