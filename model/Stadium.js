import mongoose from "mongoose";

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  capcity: {
    type: Number,
    require: true,
  },
  Clubs: {
    type: [String],
  },
  Stands: {
    type: [String],
  },
});

export default mongoose.model("Stadium", stadiumSchema);
