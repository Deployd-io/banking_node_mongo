// @ts-nocheck

const router = require("express").Router();
const express = require("express");
const User = require("../models/userModel");
const authorised = require("../middleware/authorizationMW");
const _ = require("lodash");
const Jwt = require("jsonwebtoken");
const tryCatchMW = require("../middleware/tryCatchMW");
const { error } = require("console");
const errorMW = require("../middleware/errorMW");
const uploadMW = require("../middleware/uploadMW");
const path = require("path");
const logger = require("../utils/logger");

//view profile
router.get(
  "/view-me",
  authorised,
  tryCatchMW(async (req, res) => {
	logger.info('profileRoutes', `>>> Entering GET_view_me(req=${req},res=${res})`);
    const user = Jwt.decode(req.header("x-auth-token"));

	logger.info(`GET_view_me(req=${req},res=${res}): user → ${user}`);
    if (!user) return res.status(500).send("internal server error");

	logger.info('profileRoutes', `<<< Exiting GET_view_me(req=${req},res=${res})`);
    return res.status(200).json(user);
  }),
  errorMW
);

//update profile

router.put(
  "/update",
  authorised,
  tryCatchMW(async (req, res) => {
	logger.info('profileRoutes', `>>> Entering PUT_update(req=${req},res=${res})`);
    const { payload } = req.body;

    if (payload === "picture") {
      let user = await User.findByIdAndUpdate(
        req.user._Id,
        { profileImage: req.body.image },
        { new: true }
      );

      if (!user) throw new Error();

      user.save();

      res.status(200).send("profile picture updated successfully");
      return;
    } else if (payload === "address") {
      let user = await User.findByIdAndUpdate(
        req.user._Id,
        { address: req.body.address },
        { new: true }
      );

      if (!user) throw new Error();

      user.save();

      res.status(200).send("address updated successfully");
	logger.info('profileRoutes', `<<< Exiting PUT_update(req=${req},res=${res})`);
      return;
    }
  }),
  errorMW
);

//upload profile picture
router.post(
  "/upload",
  authorised,
  uploadMW,
  tryCatchMW(async (err, req, res) => {
	logger.info('profileRoutes', `>>> Entering POST_upload(err=${err},req=${req},res=${res})`);
    logger.info("file uploaded successfully");
    const filePath = path.join(__dirname, "../../upload", req.file.filename);
	logger.info(`POST_upload(err=${err},req=${req},res=${res}): filePath → ${filePath}`);
    const decodedToken = Jwt.decode(req.header("x-auth-token"));

    //update the user profileImage path with the file path
    const user = User.findByIdAndUpdate(
      decodedToken._id,
      { profileImage: filePath },
      { new: true }
    );

    res.status(200).json({ message: " uploaded successfully", user });
	logger.info('profileRoutes', `<<< Exiting POST_upload(err=${err},req=${req},res=${res})`);
  }),
  errorMW
);

router.get("/profilePic", (req, res) => {
logger.info('profileRoutes', `>>> Entering GET_profilePic(req=${req},res=${res})`);
  console.log(__dirname);
  const filename = req.query.file;

  const filepath = path.join(__dirname, "../../upload", filename);
logger.info(`GET_profilePic(req=${req},res=${res}): filepath → ${filepath}`);

  console.log(filepath);

  if (!filename) return res.status(400);

  res.sendFile(filepath, (err) => {
    if (err) {
      res.status(404).send("file not found");
      logger.error("could not send file to user", err);
      return;
    }
    // res.status(200).send("file send successfully");
    logger.info("file sent to the user");
	logger.info('profileRoutes', `<<< Exiting GET_profilePic(req=${req},res=${res})`);
    return;
  });
});

module.exports = router;
