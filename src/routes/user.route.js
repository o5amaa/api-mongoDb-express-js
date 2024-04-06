import express from "express";

import { addUser } from "../controller/user.controller.js";

const routeUser = express.Router();

routeUser.post("/", addUser);

export default routeUser;
