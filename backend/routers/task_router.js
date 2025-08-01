const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({
      title,
      description,
      status: "To Do", // Default status
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all filtered tasks
// Retrieving all filtered tasks by status, descending/ascending order
router.get("/", async (req, res) => {
  try {
    const { status, order } = req.query;

    // Determine sort order
    const sortOrder = order === "asc" ? 1 : -1;

    // Building the query object
    const query = {};
    if (status == "To Do" || status == "In Progress" || status == "Done") {
      query.status = status;
    }

    const tasks = await Task.find(query).sort({ createdAt: sortOrder });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update only the fields that are provided
    // If title is not provided, keep the existing title
    const updatedData = {
      title: title?.trim() ? title : task.title,
      description,
      status,
    };
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true },
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
