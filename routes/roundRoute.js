import express from "express";
import {
  checkDelete,
  createRound,
  deleteRound,
  getRound,
  getRoundByTournament,
} from "../Controller/roundCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createRound);
router.delete("/:id", vertifyAdmin, checkDelete, deleteRound);
router.get("/:id", getRoundByTournament);
router.get("round/:id", getRound);

export default router;
