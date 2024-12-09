"use strict";

const Hapi = require("@hapi/hapi");
const { routes } = require("./src/server/routes");
const { loadModel } = require("./src/services/loadModel");
const validate = require("./src/validate/validate");
const HapiAuthJwt2 = require("hapi-auth-jwt2");
require("dotenv").config();

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });

  const model = await loadModel();
  server.app.model = model;

  // Plugin
  await server.register([
    {plugin: HapiAuthJwt2},
  ]);

  // Strategy
  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    validate,
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
