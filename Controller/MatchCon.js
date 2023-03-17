import Match from "../model/Match.js";
import Round from "../model/Round.js";
import Club from "../model/Club.js";
import Stafium from "../model/Stadium.js";
import { createError } from "./../utils/error.js";

// export const CheckMatch = async (req, res, next) => {
//   const matchs = await Match.find();

//   for (var x of matchs.homeClubId) {
//     if (req.body.homeClubId === x || req.body.awayClubId === x) {
//       return next(createError(401, "Club had play match in this round"));
//     }
//   }
//   for (var x of matchs.awayClubId) {
//     if (req.body.awayClubId === x || req.body.homeClubId === x) {
//       return next(createError(401, "Club had play match in this round"));
//     }
//   }
// };

export const createMatch = async (req, res, next) => {
  const newMatch = new Match(req.body);
  const homeClub = await Club.findById(req.body.homeClubId);
  const awayClub = await Club.findById(req.body.awayClubId);
  const stadium = await Stafium.findById(req.body.stadiumId);
  newMatch.nameHomeClub = homeClub.name;
  newMatch.logoHomeClub = homeClub.logo;
  newMatch.nameAwayClub = awayClub.name;
  newMatch.logoAwayClub = awayClub.logo;
  newMatch.nameStadium = stadium.name;

  try {
    const saveMatch = await newMatch.save();
    try {
      await Round.findByIdAndUpdate(req.body.roundId, {
        $push: { matchs: saveMatch._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveMatch);
  } catch (error) {
    next(error);
  }
};

export const updateMatch = async (req, res, next) => {
  try {
    const matchOid = await Match.findById(req.params.id);
    const roundOld = matchOid.roundId;
    const roundNewId = req.body.roundId;

    //update home club
    if (req.body.homeClubId != undefined) {
      const homeClub = await Club.findById(req.body.homeClubId);
      await Match.findByIdAndUpdate(
        req.params.id,
        {
          nameHomeClub: homeClub.name,
          logoHomeClub: homeClub.logo,
        },
        { new: true }
      );
    }

    //update away club
    if (req.body.awayClubId != undefined) {
      const awayClub = await Club.findById(req.body.awayClubId);
      await Match.findByIdAndUpdate(
        req.params.id,
        {
          nameAwayClub: awayClub.name,
          logoAwayClub: awayClub.logo,
        },
        { new: true }
      );
    }

    //update stadium
    if (req.body.stadiumId != undefined) {
      const stadium = await Stafium.findById(req.body.stadiumId);
      await Match.findByIdAndUpdate(
        req.params.id,
        {
          nameStadium: stadium.name,
        },
        { new: true }
      );
    }

    const updateMatch = await Match.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (req.body.roundId != undefined) {
      try {
        await Round.findByIdAndUpdate(roundOld, {
          $pull: { matchs: updateMatch._id },
        });
      } catch (error) {
        next(error);
      }

      try {
        await Round.findByIdAndUpdate(roundNewId, {
          $push: { matchs: updateMatch._id },
        });
      } catch (error) {
        next(error);
      }
    }

    res.status(200).json(updateMatch);
  } catch (error) {
    next(error);
  }
};

export const deleteMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id);
    const roundId = match.roundId;
    await Match.findByIdAndDelete(req.params.id);

    try {
      await Round.findByIdAndUpdate(roundId, {
        $pull: { matchs: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Match has been delete.");
  } catch (error) {
    next(error);
  }
};

export const getMatchByRound = async (req, res, next) => {
  try {
    const round = await Round.findById(req.params.roundid);
    const matchs = await Promise.all(
      round.matchs.map((match) => {
        return Match.findById(match);
      })
    );
    res.status(200).json(matchs);
  } catch (err) {
    next(err);
  }
};

export const getMatchByID = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id);
    res.status(200).json(match);
  } catch (err) {
    next(err);
  }
};

export const getMatch = async (req, res, next) => {
  try {
    const match = await Match.find();
    res.status(200).json(match);
  } catch (err) {
    next(err);
  }
};

export const checkDelete = async (req, res, next) => {
  const match = await Match.findById(req.params.id);
  if (match.ticketTypes.length > 0) {
    return next(
      createError(401, "Can not delete this match. Please delete ticket after")
    );
  }
};
