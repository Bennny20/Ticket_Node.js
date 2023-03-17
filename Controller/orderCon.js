import Order from "../model/Order.js";
import OrderDetail from "../model/OrderDetail.js";
import User from "../model/User.js";
import TicketType from "../model/TicketType.js";

export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  const user = await User.findById(req.body.customerId);

  newOrder.name = user.username;
  newOrder.quantity = newOrder.orderDeatails.length;
  newOrder.date - Date.now();

  for (var x of newOrder.orderDeatails) {
    const orderDetail = await OrderDetail.findById(x);
    newOrder.totalPrice += orderDetail.total;
  }
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).rjorn(updateOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  for (var x of order.orderDeatails) {
    const orderDetail = await OrderDetail.findById(x);
    const ticket = await TicketType.findById(orderDetail.ticketTypeId);
    const refundTicket = ticket.quantity + orderDetail.amount;

    await TicketType.findByIdAndUpdate(
      orderDetail.ticketTypeId,
      {
        quantity: refundTicket,
        status: true,
      },
      { new: true }
    );

    await OrderDetail.findByIdAndDelete(x);
  }

  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been delete.");
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const getByUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const orders = await Order.find({ customerId: userId });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
