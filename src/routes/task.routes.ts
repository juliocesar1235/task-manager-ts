import express from 'express';
import { taskController } from '../container';
import { validate } from '../middleware/validate';
import { createTaskSchema, updateTaskSchema } from '../types/task.schema';

const router = express.Router();

router.get('/', taskController.getAllTasks.bind(taskController));
router.get('/:id', taskController.getTaskById.bind(taskController));
router.post('/', validate(createTaskSchema),taskController.createTask.bind(taskController));
router.put('/:id', validate(updateTaskSchema), taskController.updateTask.bind(taskController));
router.delete('/:id', taskController.deleteTask.bind(taskController));

export default router;