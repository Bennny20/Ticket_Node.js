import Jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const vertifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticates"));
  }

  Jwt.verify(
    token,
    "8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI",
    (err, user) => {
      if (err) return next(createError(401, "Token is not valid"));
      req.user = user;
      next();
    }
  );
};

export const vertifyUser = (req, res, next) => {
  vertifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(401, "You are not authorized"));
    }
  });
};

export const vertifyAdmin = (req, res, next) => {
  vertifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(401, "You are not admin"));
    }
  });
};
