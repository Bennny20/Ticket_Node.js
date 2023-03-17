import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // console.log(file);
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  // fileFilter: function (req, file, callback) {
  //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
  //     callback(null, true);
  //   } else {
  //     console.log("Only .jpg & .png file supported!");
  //     callback(null, false);
  //   }
  // },
  //filename: function (req, file, cb) {
  //     let extArray = file.mimetype.split("/");
  //     let extension = extArray[extArray.length - 1];
  //     cb(null, req.body.type + '-' + Date.now() + '.' + extension);
  // },
  // fileFilter : function (req, file, cb) {
  //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //         return cb(new Error('Only image files are allowed!'), false);
  //     }
  //     cb(null, true);
  // }
  limits: {
    fieldSize: 1024 * 1024 * 2,
  },
});

export default upload;
