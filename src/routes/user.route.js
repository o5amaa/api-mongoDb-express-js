import express from "express";

import { addUser, getUser } from "../controller/user.controller.js";

const routeUser = express.Router();

routeUser.post("/", addUser);
routeUser.post("/get", getUser);

export default routeUser;
