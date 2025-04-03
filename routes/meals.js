import { Router } from "express";
import isSignedIn from "../middleware/is-signed-in.js";
import * as mealsController from "../controllers/meals.js";

const router = Router();

// INDEX - Show all meals
router.get("/", isSignedIn, mealsController.index);

// NEW - Form to log a new meal
router.get("/new", isSignedIn, mealsController.newMeal);

// CREATE - Handle form submission to create a meal
router.post("/", isSignedIn, mealsController.create);

// SHOW - Show details of one meal
router.get("/:id", isSignedIn, mealsController.show);

// EDIT - Show form to edit a meal
router.get("/:id/edit", isSignedIn, mealsController.edit);

// UPDATE - Handle form submission to update meal
router.put("/:id", isSignedIn, mealsController.update);

// DELETE - Delete a meal
router.delete("/:id", isSignedIn, mealsController.deleteMeal);

export default router;
