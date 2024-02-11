const express = require("express");
const SwaggerUi = require("swagger-ui-express");

// Masukan Paths
const registerUser = require("../swagger/paths/registerUser");
const getUserInfo = require('../swagger/paths/getUserInfo');
const getApiKeys = require("../swagger/paths/getApiKeys");
const loginUser = require("../swagger/paths/loginUser");
const profileInfo = require("../swagger/paths/profileUser");

const app = express();

const swaggerDocument = {
  swagger: "2.0",
  info: {
    description: "API Documentation for User Registration",
    version: "1.0.0",
    title: "User Registration API",
  },
  basePath: "/",
  tags: [
    {
      name: "User",
      description: "Operations related to user",
    },
  ],
  schemes: ["http"],
  paths: {
    "/users/register": registerUser,
    "/users/forgot": getUserInfo,
    "/users/getApi": getApiKeys,
    "/users/loginUser": loginUser,
    "/users/profile": profileInfo,
  },
};

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));

module.exports = app;
