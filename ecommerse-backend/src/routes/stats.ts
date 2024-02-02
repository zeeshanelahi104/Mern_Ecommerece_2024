import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import {
  getBarCharts,
  getDashboardStats,
  getLineCharts,
  getPieCharts,
} from "../contollers/stats.js";

const app = express.Router();

// route - /api/v1/dashboard/stats
app.get("stats", getDashboardStats);
// route - /api/v1/dashboard/pie
app.get("pie", adminOnly, getPieCharts);
// route - /api/v1/dashboard/bar
app.get("bar", adminOnly, getBarCharts);
// route - /api/v1/dashboard/line
app.get("line", adminOnly, getLineCharts);

export default app;
