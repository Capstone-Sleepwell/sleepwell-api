"use strict";

const Hapi = require("@hapi/hapi");
const { routes } = require("./src/server/routes");
require("dotenv").config();

const init = async () => {
  const server = Hapi.server({
    port: 3900,
    host: "localhost",
  });

  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
