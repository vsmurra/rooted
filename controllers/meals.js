import Meal from "../models/meal.js";
import Ingredient from "../models/ingredient.js";

// GET all meals
export const index = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.session.user._id }).populate("ingredients");
    res.render("meals/index", { meals });
  } catch (error) {
    res.status(500).send("Error loading meals.");
  }
};

// GET form to create new meal
export const newMeal = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.render("meals/new", { ingredients });
  } catch (error) {
    res.status(500).send("Error loading new meal form.");
  }
};

// POST create new meal
export const create = async (req, res) => {
  try {
    const { photoUrl, ingredients } = req.body;
    if (!photoUrl) throw new Error("Photo URL is required");

    const ingredientNames = ingredients.split(',').map(i => i.trim().toLowerCase());
    const ingredientDocs = await Ingredient.find({ name: { $in: ingredientNames } });

    await Meal.create({
      photoUrl,
      ingredients: ingredientDocs.map(i => i._id),
      userId: req.session.user._id,
    });

    res.redirect("/meals");
  } catch (error) {
    console.error("Error saving meal:", error);
    res.status(500).send("Error saving meal.");
  }
};

// GET meal details
export const show = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate("ingredients");
    if (!meal) return res.status(404).send("Meal not found");
    res.render("meals/show", { meal });
  } catch (error) {
    res.status(500).send("Error retrieving meal.");
  }
};

// GET form to edit a meal
export const edit = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate("ingredients");
    const allIngredients = await Ingredient.find();
    if (!meal) return res.status(404).send("Meal not found");
    res.render("meals/edit", { meal, allIngredients });
  } catch (error) {
    console.error("Error rendering edit page:", error);
    res.status(500).send("Error loading edit form.");
  }
};

// PUT update a meal
export const update = async (req, res) => {
  try {
    const { photoUrl, ingredients } = req.body;
    if (!photoUrl) throw new Error("Photo URL is required");

    const ingredientNames = ingredients.split(',').map(i => i.trim().toLowerCase());
    const ingredientDocs = await Ingredient.find({ name: { $in: ingredientNames } });

    await Meal.findByIdAndUpdate(req.params.id, {
      photoUrl,
      ingredients: ingredientDocs.map(i => i._id),
    });

    res.redirect(`/meals/${req.params.id}`);
  } catch (error) {
    console.error("Error updating meal:", error);
    res.status(500).send("Error updating meal.");
  }
};

// DELETE a meal
export const destroy = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.redirect("/meals");
  } catch (error) {
    res.status(500).send("Error deleting meal.");
  }
};
