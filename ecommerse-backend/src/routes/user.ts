import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  newUser,
} from "../contollers/user.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();
// route - /api/v1/user/new
app.post("/new", newUser);
// route - /api/v1/user/all
app.get("/all", adminOnly, getAllUsers);
// route - /api/v1/user/dyanamicID
app.route("/:id").get(getSingleUser).delete(adminOnly, deleteUser);

export default app;
