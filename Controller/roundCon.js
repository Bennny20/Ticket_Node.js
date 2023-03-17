import Round from "../model/Round.js";
import Tournament from "../model/Tournament.js";
import Match from "../model/Match.js";
import { createError } from "./../utils/error.js";

export const createRound = async (req, res, next) => {
  const tournamentId = req.body.tournamentId;
  const newRound = new Round(req.body);
  try {
    const saveRound = await newRound.save();
    try {
      await Tournament.findByIdAndUpdate(tournamentId, {
        $push: { rounds: saveRound._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveRound);
  } catch (error) {
    next(error);
  }
};

export const deleteRound = async (req, res, next) => {
  try {
    const round = await Round.findById(req.params.id);
    // if (round.matchs.length != 0) {
    //   return next(
    //     createError(
    //       401,
    //       "Can't not delete thís round. "
    //     )
    //   );
    // }
    const tournamentId = round.tournamentId;
    await Round.findByIdAndDelete(req.params.id);
    try {
      await Tournament.findByIdAndUpdate(tournamentId, {
        $pull: { rounds: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Round has been delete");
  } catch (error) {
    next(error);
  }
};

export const getRoundByTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    const rounds = await Promise.all(
      tournament.rounds.map((round) => {
        return Round.findById(round);
      })
    );
    res.status(200).json(rounds);
  } catch (err) {
    next(err);
  }
};

export const getRound = async (req, res, next) => {
  try {
    const round = await Round.findById(req.params.id);
    res.status(200).json(round);
  } catch (error) {
    next(error);
  }
};

export const setRouMatcdh = async (req, res, next) => {
  const round = req.params.id;
  try {
    const matchs = await Match.find({ roundId: round });
    for (var match of matchs) {
      await Match.findByIdAndUpdate(
        match._id,
        {
          roundId: "Chưa xác định",
        },
        { new: true }
      );
    }
    res.status(200).json("Match has been update round");
  } catch (err) {
    next(err);
  }
};

export const checkDelete = async (req, res, next) => {
  const rond = await Round.findById(req.params.id);
  if (rond.matchs.length > 0) {
    return next(
      createError(401, "Can not delete this round. Please delete match after")
    );
  }
};
