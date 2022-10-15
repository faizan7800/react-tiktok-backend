import express, { application } from "express";
import mongoose from "mongoose";
import Data from "./data.js";
import Videos from "./dbModel.js";
// App Config
const app = express();
const port = process.env.PORT || 9000;
const dbConnect =
  "mongodb+srv://faizan-admin:ArfanBhai12@cluster0.imwx1tt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeaders("Access-Control-Allow-Origin", "*"),
    res.setHeaders("Access-Control-Allow-Headers", "*"),
    next();
});
// if you will not add this then you will get the error of not adding the JSON into the Database
mongoose.connect(
  dbConnect,
  { useNewUrlParser: true },
  { useUnifiedToplogy: true }
);
// DB Config

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World Baby!"));

app.get("/v1/posts", (req, res) => {
  res.status(200).send(Data);
});
app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/v2/posts", (req, res) => {
  // POST request is used to ADD DATA to the database
  // It will let us add the video data/Document to tiktokVideos Collection
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
// Listen
app.listen(port, () => console.log(`listening on localhost ${port}`));
