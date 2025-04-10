import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToMongoDB from "./config/database.js";
import stripeRoute from "./config/stripe.js";
import passport from "./config/passport.js";

import customerRoutes from "./routes/customer.route.js";
import adminRoutes from "./routes/admin.route.js";
import bookingDaysRoutes from "./routes/bookingDays.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

const __dirname = path.resolve();

app.use(express.json()); //allows use to accept json data in the req.body
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(passport.initialize());

app.use("/api/customer/", customerRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/opening/", bookingDaysRoutes);
app.use("/api/customer/", stripeRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${port}`);
});
