module.exports = {
  post: {
    tags: ["User"],
    summery: "Login akun user dengan menggunakan username/email dan password",
    description: "Masuk kedalam akun yang sudah dibuat sebelumnya",
    consumes: ["application/x-www-form-urlencoded"],
    produces: ["application/json"],
    parameters: [
      {
        in: "formData",
        name: "username",
        type: "string",
        description: "Username yang dimiliki oleh user",
      },
      {
        in: "formData",
        name: "email",
        type: "string",
        format: "email",
        description: "Email yang dimiliki oleh user",
      },
      {
        in: "formData",
        name: "password",
        type: "string",
        format: "password",
        description: "Password yang dimiliki oleh user",
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
              example: "Selamat Datang",
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
              example: "Username/Email atau Password salah",
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
