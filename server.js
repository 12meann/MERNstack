const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
require("dotenv").config();

//bodyParser middleware
app.use(express.json());

//db config
const db = require("./config/keys").mongoURI;

//connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log("MongoDb connected...");
  })
  .catch(err => {
    console.log(err);
  });

//Use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/signup", require("./routes/api/signup"));
app.use("/api/login", require("./routes/api/login"));

// serve static assets if in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
