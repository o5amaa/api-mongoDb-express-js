import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import routeUser from "./src/routes/user.route.js";

const app = express();
app.use(express.json());

app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(
    MONGOURL
  )
  .then(() => {
    console.log("Database connected Successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port :  http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(MONGOURL);
    console.log(error);
  });

// Root endpoint
app.get("/", (_, res, next) => {
  res.send("Welcom in Ladangpage APi");
});

// test Api
app.get("/api", (_, res, next) => {
  let resp = {
    status: res.statusCode.toString(),
    message: "Ok",
    data: {},
  };

  res.json(resp);
});

app.use("/api/user", routeUser);
