const tf = require("@tensorflow/tfjs-node");

const loadModel = async (userInput) => {
  try {
    const model = await tf.loadLayersModel(process.env.MODEL_URL);

    console.log("Berhasil memuat model !");

    return model;
  } catch (error) {
    return new Error(`Terjadi kesalahan input: ${error.message}`);
  }
};

module.exports = { loadModel };
