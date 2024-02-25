module.exports = {
  get: {
    tags: ["User"],
    summery: "Mencari Info User dengan menggunakan email",
    description:
      "Mendapatkan info tentang username dan password dengan menggunakan email",
    consumes: ["application/x-www-form-urlencoded"],
    produces: ["application/json"],
    parameters: [
      {
        in: "query",
        name: "email",
        type: "string",
        format: "email",
        description: "Email yang dimiliki oleh user",
        required: true,
      },
    ],
    responses: {
      200: {
        description: "User information retrieved successfully",
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
              example: "john_doe",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },
      },
      404: {
        description: "User not found",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "User not found",
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
