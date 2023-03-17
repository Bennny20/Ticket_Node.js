import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/usersRoute.js";
import tournamentRoute from "./routes/tournamentRoute.js";
import roundRoute from "./routes/roundRoute.js";
import stadiumRoute from "./routes/stadiumRoute.js";
import clubRoute from "./routes/clubRoute.js";
import matchRoute from "./routes/matchRoute.js";
import standRoute from "./routes/standRoute.js";
import ticketTypeRoute from "./routes/ticketTypeRoute.js";
import orderRoute from "./routes/orderRoute.js";
import orderDetailRoute from "./routes/orderDetailRoute.js";

const URL = `mongodb+srv://PhienTQ:Phiengk20@cluster0.aa1zf9y.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tournaments", tournamentRoute);
app.use("/api/rounds", roundRoute);
app.use("/api/stadiums", stadiumRoute);
app.use("/api/clubs", clubRoute);
app.use("/api/matches", matchRoute);
app.use("/api/stands", standRoute);
app.use("/api/match/tickets", ticketTypeRoute);
app.use("/api/order", orderRoute);
app.use("/api/orderDetail", orderDetailRoute);
app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMess = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMess,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("🚀 Server ready at http://localhost:8800");
});
