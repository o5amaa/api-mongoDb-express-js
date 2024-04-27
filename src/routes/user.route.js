import express from "express";
import multer from "multer";

import {
  addUser,
  getUser,
  uploadImage,
} from "../controller/user.controller.js";

const url = "src/uploads/images/";
let fileName;

const storage = multer.diskStorage({
  destination: function (req, file, cp) {
    cp(null, url);
  },
  filename: (req, file, cp) => {
    console.info(file);
    const d = Date.now();
    fileName = d + "-" + file.originalname;
    cp(null, fileName);
  },
});

const upload = multer({ storage });

const routeUser = express.Router();

routeUser.post("/", addUser);
routeUser.post("/get", getUser);

routeUser.post("/uploadImage", upload.single("file"), uploadImage);

export default routeUser;
