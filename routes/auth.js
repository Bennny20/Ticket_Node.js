import express from "express";
import { login, registe } from "../Controller/authCon.js";

const router = express.Router();

router.post("/register", registe);
router.post("/login", login);

export default router;
