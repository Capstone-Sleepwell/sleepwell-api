const { loadModel } = require("../services/loadModel");

const getHomeHandler = async (request, h) => {
  return h.response({
    status: "success",
    message: "Berhasil membuka home !",
  });
};

const postPredictHandler = async (request, h) => {
  const { age, gender, cafeine, alcohol, smoking, exercise } = request.payload;

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

  return h.response({
    status: "success",
    message: "Berhasil memprediksi !",
    data: prediction,
  });
};

module.exports = { getHomeHandler, postPredictHandler };
