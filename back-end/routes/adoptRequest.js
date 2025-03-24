import express from "express";
import * as adoptController from "../controllers/adoptRequest.js";

const router = express.Router();

router.post("/", adoptController.addContactRequest);
router.get("/", adoptController.getAllRequests);
router.delete("/:id", adoptController.deleteRequest);
router.put("/:id", adoptController.approveRequest);

export { router };
