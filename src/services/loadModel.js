const tf = require("@tensorflow/tfjs-node");

const loadModel = async (userInput) => {
  try {
    const model = await tf.loadLayersModel(process.env.MODEL_URL);

    const input = tf.tensor2d(
      [
        [
          userInput.age,
          userInput.gender,
          userInput.cafeine,
          userInput.alcohol,
          userInput.smoking,
          userInput.exercise,
        ],
      ],
      [1, 6]
    );

    const prediction = model.predict(input);
    const predictionArray = await prediction.array(); // Mengubah tensor menjadi array
    const result = predictionArray[0][0];

    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { loadModel };
