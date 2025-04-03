import Meal from "../models/meal.js";
import Ingredient from "../models/ingredient.js";

// INDEX - Show all meals for the logged-in user
export const index = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.session.user._id });
    res.render("meals/index", { meals });
  } catch (error) {
    console.log("Error loading meals:", error);
    res.send("Could not load meals.");
  }
};

// NEW - Render form to create a new meal
export const newMeal = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.render("meals/new", { ingredients });
  } catch (error) {
    console.log("Error loading new meal form:", error);
    res.send("Could not load form.");
  }
};

// CREATE - Save a new meal
export const create = async (req, res) => {
  try {
    const { photoUrl } = req.body;
    let ingredients = req.body.ingredients;

    // Convert to array if it's a single comma-separated string
    if (typeof ingredients === "string") {
      ingredients = ingredients.split(",");
    }

    if (!ingredients) ingredients = [];

    const meal = await Meal.create({
      photoUrl,
      ingredients,
      userId: req.session.user._id
    });

    res.redirect(`/meals/${meal._id}`);
  } catch (error) {
    console.log("Error saving meal:", error);
    res.send("Error saving meal.");
  }
};

// SHOW - Show details of one meal
export const show = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate("ingredients");
    res.render("meals/show", { meal });
  } catch (error) {
    console.log("Error loading meal:", error);
    res.send("Could not load meal.");
  }
};

// EDIT - Render form to edit a meal
export const edit = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    const ingredients = await Ingredient.find();
    res.render("meals/edit", { meal, ingredients });
  } catch (error) {
    console.log("Error loading edit form:", error);
    res.send("Could not load edit form.");
  }
};

// UPDATE - Update the meal
export const update = async (req, res) => {
  try {
    const { photoUrl } = req.body;
    let ingredients = req.body.ingredients;

    if (typeof ingredients === "string") {
      ingredients = ingredients.split(",");
    }

    await Meal.findByIdAndUpdate(req.params.id, {
      photoUrl,
      ingredients
    });

    res.redirect(`/meals/${req.params.id}`);
  } catch (error) {
    console.log("Error updating meal:", error);
    res.send("Error updating meal.");
  }
};

// DELETE - Remove the meal
export const deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.redirect("/meals");
  } catch (error) {
    console.log("Error deleting meal:", error);
    res.send("Error deleting meal.");
  }
};
