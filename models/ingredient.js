//define three Mongoose schemas to represent the core data structures of the app

import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
    name: {type: String},
    benefits: {type: String},
});

const Ingredient = mongoose.model("ingredients", ingredientsSchema);

export default Ingredient;