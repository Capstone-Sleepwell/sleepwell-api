const tf = require("@tensorflow/tfjs-node");

const predict = async (model, inputData) => {
  try {
    const processedInput = [
      inputData.age,
      inputData.gender,
      inputData.caffeine,
      inputData.alcohol,
      inputData.smoking,
      inputData.exercise,
    ];

    const tensor = tf.tensor([processedInput]);
    console.log("Tensor shape:", tensor.shape);
    // Prediksi
    const prediction = model.predict(tensor);
    const score = await prediction.data();

    const scores = score * 100;
    console.log(scores);

    return scores;
  } catch (error) {
    throw error;
  }
};

module.exports = { predict };
