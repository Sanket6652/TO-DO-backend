// const Task = require('../models/Task');

// // Controller function for creating a task
// const createTask = async (req, res) => {
//   try {
//     // Assuming you have user_id stored in req.user.id after authentication
//     const { title, description, due_date } = req.body;

//     // Validate input data
//     if (!title || !description || !due_date) {
//       return res.status(400).json({ error: 'Please provide title, description, and due_date for the task.' });
//     }

//     // Create task
//     const newTask = new Task({
//       title,
//       description,
//       due_date,
//       priority: 0, // You might need to set priority based on your business logic
//     });

//     await newTask.save();

//     return res.status(201).json(newTask);
//   } catch (error) {
//     console.error('Error creating task:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   createTask,
// };
