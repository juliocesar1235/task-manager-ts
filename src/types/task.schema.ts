import {z} from 'zod';
import { TASK_STATUSES } from '../models/task.model';

export const createTaskSchema = z.object({
    title: z.string().min(1,'Title is required'),
    description: z.string().min(1, 'Description cannot be empty').optional(),
    status: z.enum(TASK_STATUSES).optional(),
});

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1, "description cannot be empty").optional(),
    status: z.enum(TASK_STATUSES).optional(),
}).refine(
    (data) => data.title || data.description || data.status,
    {message: 'At least one field (title, description, status) is required to update.'}
);