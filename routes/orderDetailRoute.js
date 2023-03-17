import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import { createOrderDetail, getById, getByOrder, getOrderDetail, getByUser } from "../Controller/orderDetailCon.js";

const router = express.Router();

router.post("/", createOrderDetail);
router.get("/order/:orderId", getByOrder);
router.get("/", getOrderDetail);
router.get("/:id", getById);
router.get("/user/:userId", getByUser);

export default router;
