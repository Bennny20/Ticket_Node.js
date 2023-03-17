import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import {
  checkDelete,
  createTicketType,
  deleteTicketType,
  getById,
  getByMatch,
  updateTicketType,
} from "./../Controller/ticketTypeCon.js";

const router = express.Router();

router.post("/:matchId", vertifyAdmin, createTicketType);
router.put("/:matchId/:id", vertifyAdmin, updateTicketType);
router.delete("/:matchId/:id", vertifyAdmin, deleteTicketType);
router.get("/:matchId", getByMatch);
router.get("/:matchId/:id", getById);

export default router;
