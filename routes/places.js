const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require("../middlewares/isValidObjectId");
const isAuth = require("../middlewares/isAuth");
const { isAuthorPlace } = require("../middlewares/isAuthor");
const PlaceController = require("../controllers/places");
const router = express.Router();
const { validatePlace } = require("../middlewares/validator");
const upload = require("../config/multer");

// place index & place post (kelompokan router yang sama)
router
  .route("/")
  .get(wrapAsync(PlaceController.index))
  .post(
    isAuth,
    upload.array("image", 5),
    validatePlace,
    wrapAsync(PlaceController.store)
  );

// place create
router.get("/create", isAuth, (req, res) => {
  res.render("places/create");
});

// place show, place update, place delete (kelompokan router yang sama)
router
  .route("/:id")
  .get(isValidObjectId("/places"), wrapAsync(PlaceController.show))
  .put(
    isAuth,
    isAuthorPlace,
    isValidObjectId("/places"),
    upload.array("image", 5),
    validatePlace,
    wrapAsync(PlaceController.update)
  )
  .delete(
    isAuth,
    isAuthorPlace,
    isValidObjectId("/places"),
    wrapAsync(PlaceController.destroy)
  );

// place edit
router.get(
  "/:id/edit",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.edit)
);

router.delete(
  "/:id/images",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.destroyImages)
);

module.exports = router;
