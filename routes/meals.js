import { Router } from "express";
import isSignedIn from "../middleware/is-signed-in.js";
import * as controllers from "../controllers/auth.js";

const router = Router();

// routes go here

export default router;