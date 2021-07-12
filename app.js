const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const contactsRouter = require("./src/routes/contactsRouter");
const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");
const avatarsRouter = require("./src/routes/avatarsRouter");
const { errorHandler } = require("./src/helpers/apiHelpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/users", userRouter);
app.use("/api/users", avatarsRouter);
app.use("/", express.static(path.join(__dirname, "public")));

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not found!!!" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
