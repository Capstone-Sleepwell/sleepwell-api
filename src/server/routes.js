require("dotenv").config();
const {
  getHomeHandler,
  getUsersHandler,
  getUserHandler,
  editUserHandler,
  addUserHandler,
  loginUserHandler,
  loginGoogleHandler,
  addPasswordGoogleHandler,
} = require("./handlers.js");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: getHomeHandler,
  },
  // get all user
  {
    method: "GET",
    path: "/allUsers",
    handler: getUsersHandler,
  },
  // get user by id (DONE)
  {
    method: "GET",
    path: "/users/profile",
    options: {
      auth: "jwt",
    },
    handler: getUserHandler,
  },
  // endpoint edit profile (name/birthday/gender) (DONE)
  {
    method: "PUT",
    path: "/users/profile/edit",
    options: {
      auth: "jwt",
    },
    handler: editUserHandler,
  },
  // endpoint register tanpa google (DONE)
  {
    method: "POST",
    path: "/api/register",
    handler: addUserHandler,
  },
  // enpoint login tanpa google (DONE)
  {
    method: "POST",
    path: "/api/login",
    handler: loginUserHandler,
  },
  // endpoint login dengan google (DONE)
  {
    method: "GET",
    path: "/auth/google",
    options: {
      auth: "google",
    },
    handler: loginGoogleHandler,
  },
  // endpoint set password untuk google user
  {
    method: "POST",
    path: "/users/profile/setPassword",
    options: {
      auth: "jwt",
    },
    handler: addPasswordGoogleHandler,
  },
];

module.exports = routes;
