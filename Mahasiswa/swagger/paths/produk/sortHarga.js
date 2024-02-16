module.exports = {
  get: {
    tags: ["Produk"],
    summary: "Mencari Produk berdasarkan Harga",
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
        name: "harga",
        type: "string",
        description: "Harga barang yang akan dicari",
        required: true,
        default: "Rp",
      },
    ],
    responses: {
      200: {
        description: "Price search successfully",
        schema: {
          type: "object",
          properties: {
            nama: {
              type: "string",
              example: "Taplak",
            },
            jumlah: {
              type: "string",
              example: "100",
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
