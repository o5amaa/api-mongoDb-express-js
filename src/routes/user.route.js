import express from "express";
import multer from "multer";

import { addUser, getUser, addUserImage } from "../controller/user.controller.js";

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
}); // تحديد مجلد لحفظ الصور المرفوعة

const uplod = multer({ storage: storage }).single("file");

const routeUser = express.Router();

// routeUser.post("/image", (req, res) => {
//   try {
//     uplod(req, res, function (err) {
//       if (err) {
//         return res.json({ msg: "Error uplodedd", error: err });
//       }
//       return res.json({ msg: "Uploded >> " });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

routeUser.post("/image", uplod, addUserImage);

routeUser.post("/", addUser);
routeUser.post("/get", getUser);

export default routeUser;
