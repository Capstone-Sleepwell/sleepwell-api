const { getHomeHandler, postPredictHandler } = require("./handlers");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: getHomeHandler,
  },
  {
    method: "POST",
    path: "/predict",
    handler: postPredictHandler,
  },
];

module.exports = { routes };
