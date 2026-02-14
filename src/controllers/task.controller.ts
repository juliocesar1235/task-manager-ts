import type { Request, Response } from "express";
import type { CreateTaskDTO } from "../types/task.dto";
import { taskService, TaskService } from "../services/task.service";
import type { ApiResponse } from "../types/response.dto";
import type { Task } from "../models/task.model";


export class TaskController {

    constructor(private taskService: TaskService){}

    getAllTasks(req: Request, res: Response<ApiResponse<Task[]>>): void {
        try {
            const tasks = this.taskService.getAll();
            res.status(200).json({
                success: true,
                data: tasks
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching tasks',
                error: error instanceof Error ? error.message : 'Unknown error',
            })
        }
    }

    getTaskById(req: Request<{id: string}>, res: Response<ApiResponse<Task>>): void {
        try{
            const {id} = req.params;
            const task = this.taskService.getById(id);

            if(!task) {
                res.status(404).json({
                    success: false,
                    message: `Task with id ${id} not found`,
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: task,
            });
        } catch(error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching task',
                error: error instanceof Error ? error.message : 'Unknown error',
            })
        }
    }

    createTask(req: Request<{}, {}, CreateTaskDTO>, res: Response<ApiResponse<Task>>): void {
        try {
            const taskData: CreateTaskDTO = req.body;

            if (!taskData.title || taskData.title.trim() === '') {
                res.status(400).json({
                    success: false,
                    message: 'Title is required',
                });
                return;
            }

            const newTask = this.taskService.create(taskData);

            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                data: newTask,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating task',
                error: error instanceof Error ? error.message : 'Unknown error',
            })
        }
    }
}
