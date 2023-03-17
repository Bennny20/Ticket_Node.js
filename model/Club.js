import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  stadiumId: {
    type: String,
    require: true,
  },
  nameStadium: {
    type: String,
    require: false,
  },
  logo: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
});

export default mongoose.model("club", clubSchema);
