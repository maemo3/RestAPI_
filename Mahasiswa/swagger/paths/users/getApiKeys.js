module.exports = {
    get: {
      tags: ["User"],
      summery: "Menampilkan API Keys dari user",
      description:
        "Mendapatkan info tentang APIKeys dengan menggunakan username dan password",
      consumes: ["application/x-www-form-urlencoded"],
      produces: ["application/json"],
      parameters: [
        {
          in: "query",
          name: "username",
          type: "string",
          description: "Username yang dimiliki oleh user",
          required: true,
        },
        {
            in: "query",
            name: "password",
            type: "string",
            format: "password",
            description: "Password yang dimiliki oleh user",
            required: true,
          },
      ],
      responses: {
          200: {
            description: "User information retrieved successfully",
            schema: {
              type: "object",
              properties: {
                apiKey: {
                  type: "string",
                  example: "123aBC",
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
  