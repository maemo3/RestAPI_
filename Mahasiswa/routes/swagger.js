const express = require("express");
const SwaggerUi = require("swagger-ui-express");

// Swagger User
const registerUser = require("../swagger/paths/users/registerUser");
const getUserInfo = require("../swagger/paths/users/getUserInfo");
const ApiUser = require("../swagger/paths/users/getApiKeys");
const loginUser = require("../swagger/paths/users/loginUser");
const profileUser = require("../swagger/paths/users/profileUser");

// Swagger Admin
const registerAdmin = require("../swagger/paths/admin/registerAdmin");
const getAdminInfo = require("../swagger/paths/admin/getAdminInfo");
const ApiAdmin = require("../swagger/paths/admin/getApiKeys");
const loginAdmin = require("../swagger/paths/admin/loginAdmin");
const profileAdmin = require("../swagger/paths/admin/profileAdmin");

// Swagger Produk
const addProduk = require("../swagger/paths/produk/addProduk");
const sortHarga = require("../swagger/paths/produk/sortHarga");
const sortTanggal = require("../swagger/paths/produk/sortTanggal");
const sortJenis = require("../swagger/paths/produk/sortJenis");

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
      description: "Aktivitas yang berhubungan dengan User",
    },
    {
      name: "Admin",
      description: "Aktivitas yang berhubungan dengan Admin",
    },
    {
      name: "Produk",
      description: "Aktivitas yang berhubungan dengan Produk",
    },
  ],
  schemes: ["http"],
  paths: {
    // User
    "/users/register": registerUser,
    "/users/forgot": getUserInfo,
    "/users/getApi": ApiUser,
    "/users/loginUser": loginUser,
    "/users/profile": profileUser,

    //Admin
    "/admin/register": registerAdmin,
    "/admin/forgot": getAdminInfo,
    "/admin/getApi": ApiAdmin,
    "/admin/loginUser": loginAdmin,
    "/admin/profile": profileAdmin,

    // Produk
    "/produk/addProduk": addProduk,
    "/produk/sort/harga": sortHarga,
    "/produk/sort/date": sortTanggal,
    "/produk/sort/jenis": sortJenis,
  },
};

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));

module.exports = app;
