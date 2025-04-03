import { Router } from "express";
import userRoutes from "./users.js";
import mealRoutes from "./meals.js";

const router = Router();

// Home route
router.get("/", (req, res) => {
  res.render("index");
});

// Auth routes (signup, signin, signout)
router.use("/auth", userRoutes);

// Meal routes (view, add, edit meals)
router.use("/meals", mealRoutes);

export default router;
