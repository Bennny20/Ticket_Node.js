import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  orderDeatails: {
    type: [String],
  },
});

export default mongoose.model("Order", OrderSchema);
