const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://khastolanyhafidz:YfCeKl8u0mGN16e1@dbcluster.raok0ju.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = client;
