import Tournament from "../model/Tournament.js";

export const createTournament = async (req, res, next) => {
  const newTournament = new Tournament(req.body);
  try {
    const saveTournament = await newTournament.save();
    res.status(200).json(saveTournament);
  } catch (error) {
    next(error);
  }
};

export const updateTournament = async (req, res, next) => {
  try {
    const updateTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateTournament);
  } catch (error) {
    next(error);
  }
};

export const deleteTournament = async (req, res, next) => {
  try {
    await Tournament.findByIdAndDelete(req.params.id);
    res.status(200).json("Tournament has been delete.");
  } catch (error) {
    next(error);
  }
};

export const getTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    res.status(200).json(tournament);
  } catch (error) {
    next(error);
  }
};

export const getAllTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.find();
    res.status(200).json(tournament);
  } catch (error) {
    next(error);
  }
};

export const checkDelete = async (req, res, next) => {
  const tour = await Tournament.findById(req.params.id);
  if (tour.rounds.length > 0) {
    return next(
      createError(401, "Can not delete this tournament. Please check round and delete round ")
    );
  }
};
