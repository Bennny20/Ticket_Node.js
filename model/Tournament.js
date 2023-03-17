import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  rounds: {
    type: [String],
  },
});

export default mongoose.model("Tournament", tournamentSchema);
