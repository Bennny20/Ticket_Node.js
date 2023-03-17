import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  homeClubId: {
    type: String,
    require: false,
  },
  nameHomeClub: {
    type: String,
    require: false,
  },
  logoHomeClub: {
    type: String,
    require: false,
  },
  awayClubId: {
    type: String,
    require: false,
  },
  nameAwayClub: {
    type: String,
    require: false,
  },
  logoAwayClub: {
    type: String,
    require: false,
  },
  stadiumId: {
    type: String,
    require: null,
  },
  nameStadium: {
    type: String,
    require: null,
  },
  roundId: {
    type: String,
    require: null,
  },
  date: {
    type: Date,
    require: true,
  },
  ticketTypes: {
    type: [String],
  },
  status: {
    type: Number,
    require: false,
  },
});

export default mongoose.model("Match", matchSchema);
