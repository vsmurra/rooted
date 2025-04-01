import { ingredients } from "./ingredients.js";
import db from "../db/connection.js";
import Ingredient from "../models/ingredient.js";

const insertData = async () => {
  // Reset the database
//   await db.dropDatabase();

  // Insert Data
  await Ingredient.create(ingredients);

  console.log("Ingredients have entered the Database!");

  // Close the DB
  await db.close();
};

insertData();