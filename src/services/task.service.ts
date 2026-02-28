import type { Task } from "../models/task.model";
import type { ITaskRepository } from "../repositories/interfaces/task.repository.interface";
import type { CreateTaskDTO, UpdateTaskDTO } from "../types/task.dto";


export class TaskService {
    constructor(private readonly taskRepository: ITaskRepository) {}

    getAll(): Promise<Task[]> {
        return this.taskRepository.findAll();
    }

    getById(id: string): Promise<Task | null> {
        return this.taskRepository.findById(id);
    }

    create(data: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.create(data);
    }

    update(id: string, data: UpdateTaskDTO): Promise<Task | null> {
        return this.taskRepository.update(id, data)
    }

    delete(id: string): Promise<boolean> {
        return this.taskRepository.delete(id);
    }
}