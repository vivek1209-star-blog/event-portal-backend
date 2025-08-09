
import express from "express";
import { addEvent, listEvents, updateEvent, deleteEvent, hardDeleteEvent, adminListEvents } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listEvents);
router.post("/", protect, addEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);
router.delete("/:id/hard", protect, hardDeleteEvent); 

router.get("/admin/all", protect, adminListEvents);

export default router;
