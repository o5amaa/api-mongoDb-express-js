import express from "express";
import mongoose, { Mongoose } from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import routeUser from "./src/routes/user.route.js";

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL ?? "mongodb+srv://osama775725012:osa775725012@cluster0.dnk5pur.mongodb.net/")
  .then(() => {
    console.log("Database connected Successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port :  http://localhost: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(MONGOURL);
    console.log(error);
  });

// Root endpoint
app.get("/", (req, res, next) => {
  res.send("Welcom in Ladangpage APi");
});

// test Api
app.get("/api", (req, res, next) => {
  let resp = {
    status: res.statusCode.toString(),
    message: "Ok",
    data: {},
  };

  res.json(resp);
});

app.use("/api/user", routeUser);
