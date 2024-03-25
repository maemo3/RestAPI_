module.exports = {
    get: {
      tags: ["Produk"],
      summary: "Menampilkan Produk berdasarkan Jumlah Barang",
      description: "Mencari Produk dengan menggunakan Jumlah",
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
          name: "jumlah",
          type: "string",
          description: "Barang yang akan ditampilkan berdasarkan banyak barang yang dimiliki",
          required: true,
        },
      ],
      responses: {
        200: {
          description: "Product search successfully",
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
  