import express from "express";
import {
  checkDelete,
  createStadium,
  deleteStadium,
  getAllStadium,
  getStadium,
  updateStadium,
} from "../Controller/stadiumCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createStadium);
router.put("/:id", vertifyAdmin, updateStadium);
router.delete("/:id", vertifyAdmin, checkDelete, deleteStadium);
router.get("/:id", getStadium);
router.get("/", getAllStadium);

export default router;
