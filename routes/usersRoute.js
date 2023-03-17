import express from "express";
import {
  deleteUser,
  updateUser,
  getUser,
  getUsers,
} from "../Controller/UserCon.js";
import {
  vertifyToken,
  vertifyAdmin,
  vertifyUser,
} from "../utils/vertifyToken.js";

const router = express.Router();

//Update
router.put("/:id", vertifyUser, updateUser);
//Delete
router.delete("/:id", vertifyUser, deleteUser);
//Get
router.get("/:id", vertifyUser, getUser);
//Get all
// router.get("/", vertifyAdmin, getUsers);
//
router.get("/", getUsers);
export default router;
