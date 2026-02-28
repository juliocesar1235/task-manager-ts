import type { Task } from "../../models/task.model";
import type { CreateTaskDTO, UpdateTaskDTO } from "../../types/task.dto";


// ITaskRepository holds all related query logic for Task table
export interface ITaskRepository {
    findAll(): Promise<Task[]>
    findById(id: string): Promise<Task | null>;
    create(task: CreateTaskDTO): Promise<Task>;
    update(id: string, data: UpdateTaskDTO): Promise<Task | null>;
    delete(id: string): Promise<boolean>;
}