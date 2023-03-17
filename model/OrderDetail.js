import mongoose from "mongoose";

const OrderDetailSchema = new mongoose.Schema({
  ticketTypeId: {
    type: String,
    require: true,
  },
  orderId: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
});

export default mongoose.model("OrderDetail", OrderDetailSchema);
