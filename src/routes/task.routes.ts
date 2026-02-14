import express from 'express';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';

const router = express.Router();

const taskService = new TaskService()
const taskController = new TaskController(taskService);

router.get('/', taskController.getAllTasks.bind(taskController));
router.get('/:id', taskController.getTaskById.bind(taskController));
router.post('/', taskController.createTask.bind(taskController));

export default router;