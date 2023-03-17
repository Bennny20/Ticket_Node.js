import Stand from "../model/Stand.js";
import Stadium from "../model/Stadium.js";
import Ticket from "../model/TicketType.js";
import { createError } from "./../utils/error.js";

export const createStand = async (req, res, next) => {
  const newStand = new Stand(req.body);
  try {
    newStand.stadiumId = req.params.stadiumId;
    try {
      await Stadium.findByIdAndUpdate(newStand.stadiumId, {
        $push: { Stands: newStand._id },
      });
    } catch (error) {
      next(error);
    }
    const saveStand = await newStand.save();
    res.status(200).json(saveStand);
  } catch (error) {
    next(error);
  }
};

export const getByStadium = async (req, res, next) => {
  try {
    const stadium = await Stadium.findById(req.params.stadiumId);
    const stands = await Promise.all(
      stadium.Stands.map((stand) => {
        return Stand.findById(stand);
      })
    );
    res.status(200).json(stands);
  } catch (err) {
    next(err);
  }
};

export const getStand = async (req, res, next) => {
  try {
    const stand = await Stand.findById(req.params.id);
    res.status(200).json(stand);
  } catch (error) {
    next(error);
  }
};

export const updateStand = async (req, res, next) => {
  try {
    const updateStand = await Stand.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateStand);
  } catch (error) {
    next(error);
  }
};

export const deleteStand = async (req, res, next) => {
  try {
    const stand = await Stand.findById(req.params.id);
    const stadiumId = stand.stadiumId;
    await Stand.findByIdAndDelete(req.params.id);
    try {
      await Stadium.findByIdAndUpdate(stadiumId, {
        $pull: { Stands: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Stand has been delete");
  } catch (error) {
    next(error);
  }
};

export const checkDelete = async (req, res, next) => {
  const ticket = await Ticket.find({ standId: req.params.id });
  if (ticket.length > 0) {
    return next(
      createError(401, "Can not delete this stand. Have ticket for this stand")
    );
  }
};
