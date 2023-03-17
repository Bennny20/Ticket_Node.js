import express from "express";
import {
  createTournament,
  updateTournament,
  getAllTournament,
  getTournament,
  deleteTournament,
  checkDelete,
} from "../Controller/tournamentCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createTournament);
router.put("/:id", vertifyAdmin, updateTournament);
router.delete("/:id", vertifyAdmin, checkDelete, deleteTournament);
router.get("/:id", getTournament);
router.get("/", getAllTournament);

export default router;
