
import Event from "../models/Event.js";
import moment from "moment-timezone";
import mongoose from "mongoose";

export const addEvent = async (req, res) => {
  try {
    const { title, description, category, publishDate } = req.body;
    const event = await Event.create({
      title,
      description,
      category,
      publishDate,
      user: req.user?.id || null, 
    });
    res.status(201).json({ message: "Event created", event });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, publishDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid event id" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, category, publishDate },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) return res.status(404).json({ error: "Event not found" });

    res.json({ message: "Event updated", event: updatedEvent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid event id" });
    }
    const ev = await Event.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!ev) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event soft deleted", event: ev });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const hardDeleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid event id" });
    }
    const ev = await Event.findByIdAndDelete(id);
    if (!ev) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event permanently deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listEvents = async (req, res) => {
  try {
    const timezone = req.query.timezone || "UTC";
    const now = moment().tz(timezone).toDate();
    const showAll = req.query.showAll === "true";

    let filter = { isDeleted: false };
    if (!showAll) {
      filter.publishDate = { $lte: now };
    }

    const events = await Event.find(filter)
      .populate("category", "name")
      .populate("user", "username");

    res.json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const adminListEvents = async (req, res) => {
  try {
    const { status, timezone } = req.query;
    const tz = timezone || "UTC";
    const now = moment().tz(tz).toDate();

    let filter = {};
    if (status === "published") {
      filter.publishDate = { $lte: now };
    } else if (status === "not_published") {
      filter.publishDate = { $gt: now };
    }

    const events = await Event.find(filter)
      .populate("user", "username email")
      .populate("category", "name");

    res.json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
