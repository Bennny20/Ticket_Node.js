import Stadium from "../model/Stadium.js";
import Club from "../model/Club.js";
import Match from "../model/Match.js";
import { createError } from "./../utils/error.js";

export const createStadium = async (req, res, next) => {
  const newStadium = new Stadium(req.body);
  try {
    const saveStadium = await newStadium.save();
    res.status(200).json(saveStadium);
  } catch (error) {
    next(error);
  }
};

export const updateStadium = async (req, res, next) => {
  try {
    const updateStadium = await Stadium.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateStadium);
  } catch (error) {
    next(error);
  }
};

export const deleteStadium = async (req, res, next) => {
  try {
    const stadium = await Stadium.findById(req.params.id);
    for (var x of stadium.Clubs) {
      try {
        const club = await Club.findById(x);
        club.stadiumId = "Chưa xác định";
        await club.save();
      } catch (error) {
        next(error);
      }
    }
    await Stadium.findByIdAndDelete(req.params.id);
    res.status(200).json("Stadium has been delete.");
  } catch (error) {
    next(error);
  }
};

export const getStadium = async (req, res, next) => {
  try {
    const stadium = await Stadium.findById(req.params.id);
    res.status(200).json(stadium);
  } catch (error) {
    next(error);
  }
};

export const getAllStadium = async (req, res, next) => {
  try {
    const stadium = await Stadium.find();
    res.status(200).json(stadium);
  } catch (error) {
    next(error);
  }
};

export const checkDelete = async (req, res, next) => {
  const clubs = await Club.findById({ stadiumId: req.params.id });
  if (clubs.length > 0) {
    return next(
      createError(401, "Can not delete this stadium. Stdium have club use")
    );
  }

  const matchs = await Match.find({ stadiumId: req.params.id });
  if (matchs.length > 0) {
    return next(
      createError(
        401,
        "Can not delete this stadium. Stdium have match will play"
      )
    );
  }

  const stadium = await Stadium.findById(req.params.id);
  if (stadium.Stands.length > 0) {
    return next(
      createError(401, "Can not delete this stadium. Please delete stand after")
    );
  }
};
