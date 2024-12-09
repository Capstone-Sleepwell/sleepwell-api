const { getHomeHandler, postPredictHandler, 
 getHistoriesHandler, deleteHistoryHandler } = require("./handlers");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: getHomeHandler,
  },
  // post prediksi
  {
    method: "POST",
    path: "/predict",
    options: {
      auth: 'jwt'
    },
    handler: postPredictHandler,
  },
  // get histori prediksi by userid
  {
    method: 'GET',
    path: "/predict/histories",
    options: {
      auth: 'jwt'
    },
    handler: getHistoriesHandler,
  },
  // hapus riwayat prediksi by userid dan predict id
  {
    method: 'DELETE',
    path: "/predict/histories/{predictId}",
    options: {
      auth: 'jwt'
    },
    handler: deleteHistoryHandler,
  },
];

module.exports = { routes };
