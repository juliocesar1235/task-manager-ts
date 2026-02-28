import express from 'express';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';
import { TaskRepository } from '../repositories/task.repository';
import { prisma } from '../lib/prisma';

const router = express.Router();

const taskRepository = new TaskRepository(prisma)
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService);

router.get('/', taskController.getAllTasks.bind(taskController));
router.get('/:id', taskController.getTaskById.bind(taskController));
router.post('/', taskController.createTask.bind(taskController));
router.put('/:id', taskController.updateTask.bind(taskController));
router.delete('/:id', taskController.deleteTask.bind(taskController));

export default router;