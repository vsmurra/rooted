import Meal from "../models/meal.js";
import Ingredient from "../models/ingredient.js";
import User from "../models/user.js";

export const index = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.session.user._id }).populate("ingredients");
    res.render("meals/index", { meals });
  } catch (error) {
    console.log(error);
    res.send("Error loading meals.");
  }
};


export const newMeal = async (req, res) => {
    try {
      const ingredients = await Ingredient.find(); // show all ingredients for the form
      res.render("meals/new", { ingredients });
    } catch (error) {
      console.log(error);
      res.send("Error loading form.");
    }
  };
  

  export const create = async (req, res) => {
    try {
      const { photoUrl, ingredients } = req.body;
  
      // Save new meal
      const meal = await Meal.create({
        photoUrl,
        ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
        userId: req.session.user._id
      });
  
      res.redirect(`/meals/${meal._id}`);
    } catch (error) {
      console.log(error);
      res.send("Error saving meal.");
    }
  };
  

  export const show = async (req, res) => {
    try {
      const meal = await Meal.findById(req.params.id).populate("ingredients");
      res.render("meals/show", { meal });
    } catch (error) {
      console.log(error);
      res.send("Could not find meal.");
    }
  };
  

  export const edit = async (req, res) => {
    try {
      const meal = await Meal.findById(req.params.id);
      const ingredients = await Ingredient.find();
      res.render("meals/edit", { meal, ingredients });
    } catch (error) {
      console.log(error);
      res.send("Could not load edit form.");
    }
  };
  

  export const update = async (req, res) => {
    try {
      const { photoUrl, ingredients } = req.body;
  
      await Meal.findByIdAndUpdate(req.params.id, {
        photoUrl,
        ingredients: Array.isArray(ingredients) ? ingredients : [ingredients]
      });
  
      res.redirect(`/meals/${req.params.id}`);
    } catch (error) {
      console.log(error);
      res.send("Error updating meal.");
    }
  };
  

  export const deleteMeal = async (req, res) => {
    try {
      await Meal.findByIdAndDelete(req.params.id);
      res.redirect("/meals");
    } catch (error) {
      console.log(error);
      res.send("Error deleting meal.");
    }
  };
  