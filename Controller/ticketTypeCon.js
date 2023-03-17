import TicketType from "../model/TicketType.js";
import Stand from "../model/Stand.js";
import Match from "../model/Match.js";
import OrderDetail from "../model/OrderDetail.js";
import { createError } from "../utils/error.js";

export const createTicketType = async (req, res, next) => {
  const newTicketType = new TicketType(req.body);
  const stand = await Stand.findById(req.body.standId);
  newTicketType.nameStand = stand.name;

  try {
    if (stand.quantitySeat < newTicketType.quantity) {
      return next(
        createError(
          401,
          "The quantity of tickets is more than the number of seats"
        )
      );
    }

    newTicketType.matchId = req.params.matchId;
    const saveTicketType = await newTicketType.save();
    try {
      await Match.findByIdAndUpdate(req.params.matchId, {
        $push: { ticketTypes: saveTicketType._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveTicketType);
  } catch (error) {
    next(error);
  }
};

export const updateTicketType = async (req, res, next) => {
  const ticketType = await TicketType.findById(req.params.id);
  const stand = await Stand.findById(req.body.standId);
  try {
    //update req.body.standId != undefined
    if (req.body.standId != undefined && req.body.quantity == undefined) {
      ticketType.nameStand = stand.name;
      if (stand.quantitySeat < ticketType.quantity) {
        return next(
          createError(
            401,
            "The quantity of tickets is more than the number of seats"
          )
        );
      }
      await TicketType.findByIdAndUpdate(
        req.params.id,
        { standId: stand._id, nameStand: stand.name },
        { new: true }
      );
    }

    //check update quantity
    if (req.body.quantity != undefined && req.body.standId == undefined) {
      const stand = await Stand.findById(ticketType.standId);
      if (stand.quantitySeat < req.body.quantity) {
        return next(
          createError(
            401,
            "The quantity of tickets is more than the number of seats"
          )
        );
      }
    }

    const updateTicketType = await TicketType.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateTicketType);
  } catch (error) {
    next(error);
  }
};

export const deleteTicketType = async (req, res, next) => {
  const orderDetail = await OrderDetail.find({ ticketTypeId: req.params.id });
  if (orderDetail.length > 0) {
    return next(
      createError(401, "Can not delete this ticket. Have user buy this ticket")
    );
  }

  try {
    const ticket = await TicketType.findById(req.params.id);
    try {
      await Match.findByIdAndUpdate(ticket.matchId, {
        $pull: { ticketTypes: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    await TicketType.findByIdAndDelete(req.params.id);
    res.status(200).json("TicketType has been delete");
  } catch (error) {
    next(error);
  }
};

export const getByMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.matchId);
    const ticketTypes = await Promise.all(
      match.ticketTypes.map((type) => {
        return TicketType.findById(type);
      })
    );
    res.status(200).json(ticketTypes);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const ticketType = await TicketType.findById(req.params.id);
    res.status(200).json(ticketType);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const ticketTypes = await TicketType.find();
    res.status(200).json(ticketTypes);
  } catch (err) {
    next(err);
  }
};

export const checkDelete = async (req, res, next) => {
  const orderDetail = await OrderDetail.find({ ticketTypeId: req.params.id });
  if (orderDetail.length > 0) {
    return next(
      createError(401, "Can not delete this ticket. Have user buy this ticket")
    );
  }
};
