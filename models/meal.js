// meal has a base64 or URL image, a list of ingredients (referenced), and is linked to the user who created it


import mongoose from "mongoose";

const mealsSchema = new mongoose.Schema({
    photoUrl: {type: String, required: true},
    ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: "ingredients"}],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "users"}
});

const Meal = mongoose.model("meals", mealsSchema);

export default Meal;