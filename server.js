const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");

require("dotenv").config({ path: "config.env" });

const user = require("./routes/userRoutes");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
const app = express();
app.use(helmet());

app.use(logger("dev")); //mongoose
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", user);
app.use("/", (req, res) => {
  res.send("Hello");
});

app.listen(8888, () => console.log(process.env.DATABASE));
