module.exports = {
  post: {
    tags: ["User"],
    summery: "Register a new user",
    description:
      "Register a new user with provided username, emails, and password",
    produces: ["application/json"],
    parameters: [
      {
        in: "formData",
        name: "username",
        type: "string",
        description: "Username of user",
        required: true,
      },
      {
        in: "formData",
        name: "email",
        type: "string",
        format: "email",
        description: "Email Address of user",
        required: true,
      },
      {
        in: "formData",
        name: "password",
        type: "string",
        description: "Password Account of user",
        required: true,
      },
    ],
    responses: {
      200: {
        description: "User registered successfully",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "User Dibuat dengan ApiKeys :",
            },
          },
        },
      },
      400: {
        description: "Bad Request",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Registrasi Gagal",
            },
          },
        },
      },
      500: {
        description: "Internal Server Error",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Something went wrong, I can feel it",
            },
          },
        },
      },
    },
  },
};