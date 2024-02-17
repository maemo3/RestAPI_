module.exports = {
  post: {
    tags: ["Produk"],
    summary: "Menambahkan Produk",
    description: "Menambahkan Produk dengan akses Admin",
    consumes: ["application/x-www-form-urlencoded"],
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
      },
    ],
    responses: {
      200: {
        description: "Product add successfully",
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
      401: {
        description: "Bad Request",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Hanya admin yang dapat menambahkan produk",
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
