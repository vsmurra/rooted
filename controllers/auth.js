import User from "../models/user.js";
import bcrypt from "bcrypt";

// SIGN UP PAGE
export const getSignUp = (req, res) => {
  res.render("auth/sign-up");
};

// SIGN IN PAGE
export const getSignIn = (req, res) => {
  res.render("auth/sign-in");
};

// REGISTER NEW USER
export const registerUser = async (req, res) => {
  // 1. Check if passwords match
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match.");
  }

  // 2. Check if username already exists
  const userInDB = await User.findOne({ username: req.body.username });
  if (userInDB) {
    return res.send("Username already taken.");
  }

  // 3. Hash the password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  // 4. Create user
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
  });

  // 5. Redirect to login (don’t log them in yet)
  req.session.save(() => {
    res.redirect("/auth/sign-in");
  });
};

// LOG IN USER
export const loginUser = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });

  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );

  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }

  req.session.user = {
    _id: userInDatabase._id,
    username: userInDatabase.username,
  };

  req.session.save(() => {
    res.redirect("/meals"); // Redirect to landing page after login
  });
};

// SIGN OUT USER
export const signOutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
