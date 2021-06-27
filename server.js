require("dotenv").config();
const { connectMongo } = require("./src/db/connection");
const app = require("./app");

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) console.log("Error at server launch: ", err);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to launch application with error: ", error.message);
  }
};

start();
