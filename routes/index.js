import { Router } from "express";
import userRoutes from "./users.js";
import mealRoutes from "./meals.js";
import ingredientRoutes from "./ingredients.js"; // Ingredient search routes

const router = Router();

// Home route
router.get("/", (req, res) => {
  res.render("index");
});

// Auth routes (signup, signin, signout)
router.use("/auth", userRoutes);

// Meal routes (view, add, edit meals)
router.use("/meals", mealRoutes);

// ✅ Ingredient search route for live suggestions
router.use("/ingredients", ingredientRoutes);

export default router;
