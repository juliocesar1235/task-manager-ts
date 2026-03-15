import { z } from 'zod';
import type {TaskStatus} from '../models/task.model'
import type { createTaskSchema, updateTaskSchema } from './task.schema';

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;

export type CreateTaskInput = {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export type UpdateTaskInput = {
    title?: string;
    description?: string;
    status?: TaskStatus;
};

export interface TaskFilterDTO {
  status?: TaskStatus;
  search?: string;
}

export interface PaginationDTO {
  page: number;
  limit: number;
}