import OrderDetail from "../model/OrderDetail.js";
import Order from "../model/Order.js";
import TicketType from "../model/TicketType.js";
import { createError } from "../utils/error.js";

export const createOrderDetail = async (req, res, next) => {
  const newOrderDetail = new OrderDetail(req.body);
  const ticket = await TicketType.findById(req.body.ticketTypeId);
  var quantityTicket = ticket.quantity - req.body.amount;

  if (ticket.quantity < 1) {
    return next(createError(401, "Tickets are sold out"));
  }
  if (quantityTicket < 0) {
    return next(createError(401, "Only " + ticket.quantity + " tickets left"));
  }

  newOrderDetail.total = ticket.price * newOrderDetail.amount;
  try {
    const saveOrderDetail = await newOrderDetail.save();
    try {
      await Order.findByIdAndUpdate(req.body.orderId, {
        $push: { orderDeatails: saveOrderDetail._id },
      });
    } catch (error) {
      next(error);
    }

    const order = await Order.findById(req.body.orderId);
    var tototalOrder = order.totalPrice;
    const quantity = order.orderDeatails.length;
    tototalOrder = tototalOrder + newOrderDetail.total;

    await Order.findByIdAndUpdate(
      req.body.orderId,
      {
        quantity: quantity,
        totalPrice: tototalOrder,
      },
      { new: true }
    );
    //update quantity TicketType
    var statusTicket = ticket.status;
    if (quantityTicket == 0) {
      statusTicket = false;
    }
    await TicketType.findByIdAndUpdate(
      req.body.ticketTypeId,
      {
        quantity: quantityTicket,
        status: statusTicket,
      },
      { new: true }
    );

    res.status(200).json(saveOrderDetail);
  } catch (error) {
    next(error);
  }
};

export const getByOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    const listOrderDetail = await Promise.all(
      order.orderDeatails.map((orderDetail) => {
        return OrderDetail.findById(orderDetail);
      })
    );
    res.status(200).json(listOrderDetail);
  } catch (err) {
    next(err);
  }
};

export const getOrderDetail = async (req, res, next) => {
  try {
    const orderDetail = await OrderDetail.find();
    res.status(200).json(orderDetail);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const orderDetail = await OrderDetail.findById(req.params.id);
    res.status(200).json(orderDetail);
  } catch (err) {
    next(err);
  }
};

export const getByUser = async (req, res, next) => {
  const userId = req.params.userId;
  var orderDetail = [];
  try {
    const orders = await Order.find({ customerId: userId });
    for (var order of orders) {
      for (var id of order.orderDeatails) {
        orderDetail.push(await OrderDetail.findById(id));
      }
    }
    res.status(200).json(orderDetail);
  } catch (err) {
    next(err);
  }
};
