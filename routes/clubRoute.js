import express from "express";
import {
  createClub,
  deleteClub,
  updateClub,
  getAllClub,
  getClub,
  checkDelete,
} from "../Controller/clubCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

// router.post("/", vertifyAdmin, upload.single("logo"), createClub);
// router.put("/:id", vertifyAdmin,upload.single("logo"), updateClub);
// router.delete("/:id", vertifyAdmin, deleteClub);
router.post("/", vertifyAdmin, createClub);
router.put("/:id", vertifyAdmin, updateClub);
router.delete("/:id", vertifyAdmin, checkDelete, deleteClub);
router.get("/:id", getClub);
router.get("/", getAllClub);

export default router;
