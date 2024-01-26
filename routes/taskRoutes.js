const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Subtask = require("../models/SubTask");
router.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, due_date, subtaskTitle } = req.body;
    const priority = calculatePriority(due_date);

    const task = new Task({
      title,
      description,
      due_date,
      priority,
    });
    await task.save();
    const subtask = new Subtask({
      task_id: task._id,
      title: subtaskTitle,
      status: 0,
    });
    await subtask.save();
    task.subtasks.push(subtask._id);
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
function calculatePriority(dueDate) {
  const today = new Date();
  const timeDifference = dueDate - today;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); 

  if (daysDifference === 0) {
    return 0; // Due date is today
  } else if (daysDifference <= 2) {
    return 1; // Due date is between tomorrow and day after tomorrow
  } else if (daysDifference <= 4) {
    return 2; // Due date is between 3 and 4 days
  } else if (daysDifference <= 5) {
    return 3; // Due date is 5 or more days away
  }
  return 2;
}
router.get("/api/gettasks", async (req, res) => {
  try {
    const { priority, due_date, page = 1, limit = 10 } = req.query;

    const filterCriteria = {};
    if (priority !== undefined) {
      filterCriteria.priority = priority;
    }
    if (due_date !== undefined) {
      filterCriteria.due_date = due_date;
    }

    const tasks = await Task.find(filterCriteria)
      .sort({ due_date: "asc" }) 
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


/// get subtask
router.get("/api/subtasks", async (req, res) => {
  try {
    const { task_id } = req.query;
    const filterCriteria = {};
    if (task_id !== undefined) {
      filterCriteria.task_id = task_id;
    }
    const subtasks = await Subtask.find(filterCriteria).exec();

    res.status(200).json({ subtasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//update task
router.put("/api/tasks/:taskId", async (req, res) => {
  try {
    const { due_date, status } = req.body;
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (due_date !== undefined) {
      task.due_date = due_date;
    }
    if (status !== undefined) {
      task.status = status;
    }
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

///update suntask with status
router.put("/api/subtasks/:subtaskId", async (req, res) => {
  try {
    const { status } = req.body;
    const { subtaskId } = req.params;

    const subtask = await Subtask.findById(subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }


    if (status !== undefined) {
      subtask.status = status;
    }

    await subtask.save();

    res.status(200).json({ message: "Subtask updated successfully", subtask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// soft deletion of task
router.delete("/api/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;


    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.deleted_at = new Date();
    await task.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// soft deletion of task

router.delete("/api/subtasks/:subtaskId", async (req, res) => {
  try {
    const { subtaskId } = req.params;

    // Find the subtask by subtaskId
    const subtask = await Subtask.findById(subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    subtask.deleted_at = new Date();

    await subtask.save();

    res.status(200).json({ message: "Subtask deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
