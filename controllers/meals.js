import Meal from "../models/meal.js";
import Ingredient from "../models/ingredient.js";

// Show all meals for the logged-in user
export const index = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.session.user._id }).populate("ingredients");
    res.render("meals/index", { meals });
  } catch (error) {
    res.status(500).send("Error retrieving meals.");
  }
};

// Show form to log a new meal
export const newMeal = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render("meals/new", { ingredients });
  } catch (error) {
    res.status(500).send("Error loading form.");
  }
};

// Create and save a new meal
export const create = async (req, res) => {
  try {
    const ingredientNames = Array.isArray(req.body.ingredients)
      ? req.body.ingredients
      : [req.body.ingredients];

    const foundIngredients = await Ingredient.find({ name: { $in: ingredientNames } });

    const meal = await Meal.create({
      photoUrl: req.body.photoUrl,
      ingredients: foundIngredients.map(i => i._id),
      userId: req.session.user._id
    });

    res.redirect("/meals");
  } catch (error) {
    console.error("Error saving meal:", error);
    res.status(500).send("Error saving meal.");
  }
};

// Show detail page for a single meal
export const show = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate("ingredients");
    if (!meal) return res.status(404).send("Meal not found.");
    res.render("meals/show", { meal });
  } catch (error) {
    res.status(500).send("Error showing meal.");
  }
};

// Show edit form for a meal
export const edit = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    const ingredients = await Ingredient.find({});
    if (!meal) return res.status(404).send("Meal not found.");
    res.render("meals/edit", { meal, ingredients });
  } catch (error) {
    res.status(500).send("Error loading edit form.");
  }
};

// Update a meal
export const update = async (req, res) => {
  try {
    const ingredientNames = Array.isArray(req.body.ingredients)
      ? req.body.ingredients
      : [req.body.ingredients];

    const foundIngredients = await Ingredient.find({ name: { $in: ingredientNames } });

    await Meal.findByIdAndUpdate(req.params.id, {
      photoUrl: req.body.photoUrl,
      ingredients: foundIngredients.map(i => i._id),
    });

    res.redirect("/meals/" + req.params.id);
  } catch (error) {
    res.status(500).send("Error updating meal.");
  }
};

// Delete a meal
export const deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.redirect("/meals");
  } catch (error) {
    res.status(500).send("Error deleting meal.");
  }
};
