import type { Task } from "../models/task.model";
import type { CreateTaskDTO, UpdateTaskDTO } from "../types/task.dto";


export class TaskService {
    private tasks: Task[] = [];
    private nextId: number = 1;

    getAll(): Task[] {
        return this.tasks;
    }

    getById(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }

    create(taskData: CreateTaskDTO): Task {
        const newTask: Task = {
            id: (this.nextId++).toString(),
            title: taskData.title,
            description: taskData.description || '',
            status: taskData.status || 'PENDING',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        this.tasks.push(newTask);
        return newTask;
    }

    update(id: string, data: UpdateTaskDTO): Task | null {
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return null
        }

        const taskToUpdate: Task = this.tasks[taskIndex] as Task;

        const updatedTask: Task = {
            ...taskToUpdate,
            ...data,
            updatedAt: new Date(),
        }

        this.tasks[taskIndex] = updatedTask;
        return updatedTask;
    }

    delete(id: string): boolean {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        if (initialLength === this.tasks.length) {
            return false;
        }
        return true;
    }

}

export const taskService = new TaskService();