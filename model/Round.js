import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({
  numberRound: {
    type: Number,
    require: true,
  },
  tournamentId: {
    type: String,
    require: true,
  },
  matchs: {
    type: [String],
  },
});

export default mongoose.model("Round", roundSchema);
