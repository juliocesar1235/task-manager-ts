import type { Task } from "../models/task.model";
import type { ITaskRepository } from "../repositories/interfaces/task.repository.interface";
import type { CreateTaskDTO, CreateTaskInput, UpdateTaskDTO, UpdateTaskInput } from "../types/task.dto";


export class TaskService {
    constructor(private readonly taskRepository: ITaskRepository) {}

    getAll(): Promise<Task[]> {
        return this.taskRepository.findAll();
    }

    getById(id: string): Promise<Task | null> {
        return this.taskRepository.findById(id);
    }

    create(data: CreateTaskDTO): Promise<Task> {
        const taskToCreate: CreateTaskInput = {
            title: data.title,
            ...(data.description !== undefined && { description: data.description }),
            ...(data.status      !== undefined && { status: data.status }),
        }
        return this.taskRepository.create(taskToCreate);
    }

    update(id: string, data: UpdateTaskDTO): Promise<Task | null> {
        const taskToUpdate: UpdateTaskInput = {
        ...(data.title       !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status      !== undefined && { status: data.status }),
        }
        return this.taskRepository.update(id, taskToUpdate);
    }

    delete(id: string): Promise<boolean> {
        return this.taskRepository.delete(id);
    }
}