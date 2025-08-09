import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addCategory,
  listCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", protect, addCategory);
router.get("/", listCategories);
router.put("/:id", protect, updateCategory);    // Add update route
router.delete("/:id", protect, deleteCategory); // Add delete route

export default router;
