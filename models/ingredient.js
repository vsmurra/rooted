import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
    name: {type: String},
    benefits: {type: String},
});

const Ingredient = mongoose.model("ingredients", ingredientsSchema);

export default Ingredient;