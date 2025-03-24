import express from "express";
import { validate as isUUID } from "uuid";
import * as adoptController from "../controllers/adoptRequest.js";

const router = express.Router();

router.post("/", adoptController.addContactRequest);

export { router };
