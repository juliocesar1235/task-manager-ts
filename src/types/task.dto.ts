import type {TaskStatus} from '../models/task.model'

export interface CreateTaskDTO {
    title: string;
    description?: string;
    status?: TaskStatus;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TaskFilterDTO {
  status?: TaskStatus;
  search?: string;
}

export interface PaginationDTO {
  page: number;
  limit: number;
}