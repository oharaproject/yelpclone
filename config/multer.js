const multer = require("multer");
const path = require("path");
const ExpressError = require("../utils/ExpressError");

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // directori penyimpanan gambar dalam folder public
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname) // format nama file
    );
  },
});

const upload = multer({
  storage: storage, // gunakan konfigurasi penyimpanan yang telah dibuat

  // fungsi untuk memfilter/memeriksa format file yang diupload
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // hanya izinkan file gambar
    } else {
      cb(new ExpressError("Only image are allowed!", 405), false); // tolak file bukan gambar
    }
  },
});

module.exports = upload;
