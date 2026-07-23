const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "CSE 341 Project 2 API",
    description: "Items and Users API Documentation for CRUD Operations",
  },
  host: "",
  basePath: "/",
  schemes: ["https", "http"],
  paths: {
    "/login": {
      get: {
        description:
          "<p style='color: #b0b5bc;'>CLICK THIS ARROW TO LOG IN LOCALLY: <a href='http://localhost:3000/login' target='_blank' style='color: #ffffff; background-color: #24292e; padding: 10px 15px; border-radius: 5px; text-decoration: none; display: inline-block; font-weight: bold;'>➡️</a></p><p style='color: #b0b5bc;'>CLICK THIS ARROW TO LOG IN TO RENDER: <a href='https://cse341project2-0k9h.onrender.com/login' target='_blank' style='color: #ffffff; background-color: #24292e; padding: 10px 15px; border-radius: 5px; text-decoration: none; display: inline-block; font-weight: bold;'>➡️</a></p>",
      },
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
