const express = require('express');
const SwaggerUi = require("swagger-ui-express");
const registerPath = require('../swagger/paths/register');

const app = express();

const swaggerDocument = {
    swagger: "2.0",
    info: {
        description: "API Documentation for User Registration",
        version: "1.0.0",
        title: "User Registration API"
    },
    basePath: "/",
    tags: [{
        name: "user",
        description: "Operations related to user registration"
    }],
    schemes:["http"],
    paths: {
        "/users/register": registerPath
    }
};

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));

module.exports = app;