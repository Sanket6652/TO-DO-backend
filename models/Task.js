// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: Date, required: true },
  priority: { type: Number, required: true },
  status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO' },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
