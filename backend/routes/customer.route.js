import express from "express";
import {
  booking,
  contact,
  getProfile,
  login,
  logout,
  refreshToken,
  registerUser,
  removeBackgroundController,
} from "../controllers/customer.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import passport from "passport";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);

router.post("/remove-bg", upload.single("image"), removeBackgroundController);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);

//contact
router.post("/contact", contact);
//booking
router.post("/booking", booking);

// passport
// Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

// Facebook Auth
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

// Instagram Auth
router.get("/instagram", passport.authenticate("instagram"));

router.get(
  "/instagram/callback",
  passport.authenticate("instagram", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

// Get User Info
router.get("/user", (req, res) => {
  res.json(req.user || null);
});

export default router;
