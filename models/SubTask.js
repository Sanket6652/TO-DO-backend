// models/subtask.js
const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  title: { type: String, required: true },
  status: { type: Number, enum: [0, 1], default: 0 }, // 0 - incomplete, 1 - complete
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});

const Subtask = mongoose.model('Subtask', subtaskSchema);

module.exports = Subtask;
