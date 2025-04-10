import express from "express";
import {
  booking,
  contact,
  getProfile,
  getVisitorCount,
  login,
  logout,
  refreshToken,
  registerUser,
  removeBackgroundController,
} from "../controllers/customer.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import passport from "passport";
import { setCookies } from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", getVisitorCount);
router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);

router.post("/remove-bg", upload.single("image"), removeBackgroundController);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);

// Contact and Booking
router.post("/contact", contact);
router.post("/booking", booking);

// Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const { user, tokens } = req.user;
    setCookies(res, tokens.accessToken, tokens.refreshToken);

    res.redirect(`http://localhost:5173/?accessToken=${tokens.accessToken}`);
  }
);

router.get("/user", protectRoute, (req, res) => {
  res.json(req.user);
});

export default router;
