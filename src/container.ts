import { prisma } from './lib/prisma';
import { TaskRepository } from './repositories/task.repository';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';

// Instances of dependencies
const taskRepository = new TaskRepository(prisma);
const taskService = new TaskService(taskRepository);
export const taskController = new TaskController(taskService);