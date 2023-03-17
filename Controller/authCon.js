import User from "../model/User.js";
import bcrypt from "bcrypt";
import { createError } from "./../utils/error.js";
import Jwt from "jsonwebtoken";

export const registe = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been create.");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
      return next(createError(400, "User or password is wrong"));
    }

    const token = Jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI"
    );

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails, token });
  } catch (error) {
    next(error);
  }
};
