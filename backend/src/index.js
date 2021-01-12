const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
var bodyParser = require('body-parser')

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./routes/video.routes"));

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
