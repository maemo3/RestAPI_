module.exports = {
    post: {
      tags: ["Produk"],
      summery: "Menambahkan Produk",
      description:
        "Register a new user with provided username, emails, and password",
      produces: ["application/json"],
      parameters: [
        {
          in: "query",
          name: "apiKey",
          type: "string",
          description: "API Key yang dimiliki oleh user",
          required: true,
        },
        {
          in: "formData",
          name: "nama",
          type: "string",
          description: "Nama produk yang akan ditambahkan",
          required: true,
        },
        {
          in: "formData",
          name: "jumlah",
          type: "string",
          description: "Jumlah produk yang akan ditambahkan",
          required: true,
        },
        {
          in: "formData",
          name: "harga",
          type: "string",
          description: "Harga produk yang akan ditambahkan",
          required: true,
          default: "Rp",
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
                example: "Produk berhasil ditambahkan",
              },
            },
          },
        },
        403: {
          description: "Bad Request",
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "User ditolak",
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