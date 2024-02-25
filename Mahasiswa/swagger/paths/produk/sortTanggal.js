module.exports = {
  get: {
    tags: ["Produk"],
    summary: "Mencari Produk berdasarkan Tanggal",
    description: "Mencari Produk dengan menggunakan harga",
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
        in: "query",
        name: "date",
        type: "string",
        format: "date",
        description: "Tanggal barang yang ingin dicari",
        required: true,
        default: "DD/MM/YYYY",
      },
    ],
    responses: {
      200: {
        description: "Price search successfully",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "{Object}",
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
      404: {
        description: "Not Found",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Produk tidak ditemukan",
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
