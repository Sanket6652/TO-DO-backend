# TO DO App backend


## Technology Used
- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

- Create, update, and delete tasks.
- Create and manage subtasks for existing tasks.
- Get user tasks with filters for priority, due date, and pagination.
- Get user subtasks with a filter for `task_id`.
- Soft deletion of tasks and subtasks.
- Priority calculation based on due date.
- Voice calling using Twilio for overdue tasks.

## Models

### Task Model

- **title:** Title of the task.
- **description:** Description of the task.
- **due_date:** Due date of the task.
- **priority:** Priority of the task based on due date.
- **status:** Task status (`TODO`, `IN_PROGRESS`, `DONE`).
- **subtasks:** Array of subtasks associated with the task.
- **created_at:** Date of task creation.
- **updated_at:** Date of task last update.
- **deleted_at:** Date of soft deletion.

### Subtask Model

- **task_id:** Reference to the parent task.
- **title:** Title of the subtask.
- **status:** Subtask status (`0` for incomplete, `1` for complete).
- **created_at:** Date of subtask creation.
- **updated_at:** Date of subtask last update.
- **deleted_at:** Date of soft deletion.
