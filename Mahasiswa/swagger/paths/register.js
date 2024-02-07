module.exports = {
    post: {
        tags: ["user"],
        summery: "Register a new user",
        description: "Register a new user with provided username, emails, and password",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [{
            in: "body",
            name: "body",
            description: "User object that needs to be registered",
            required: true,
            schema: {
                $ref: "../definitions/user#definitions/User"
            }
        }],
        responses: {
            200: {
                description: "User registered successfully",
                schema: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Registrasi Berhasil"
                        }
                    }
                }
            },
            400: {
                description: "Bad Request",
                schema: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Registrasi Gagal"
                        }
                    }
                }
            },
            500: {
                description: "Internal Server Error",
                schema: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Something went wrong, I can feel it"
                        }
                    }
                }
            },
        }
    }
}