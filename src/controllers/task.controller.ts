import type { Request, Response } from "express";
import type { CreateTaskDTO, UpdateTaskDTO } from "../types/task.dto";
import { TaskService } from "../services/task.service";
import type { ApiResponse } from "../types/response.dto";
import { TASK_STATUSES, type Task } from "../models/task.model";
import { handleError } from "./response";


export class TaskController {

    constructor(private taskService: TaskService){}

    getAllTasks = async (req: Request, res: Response<ApiResponse<Task[]>>): Promise<void>  => {
        try {
            const tasks = await this.taskService.getAll();
            res.status(200).json({
                success: true,
                data: tasks
            });
        } catch (error) {
            handleError(res, 'Couldnt retrieve all tasks', error);
        }
    }

    getTaskById = async (req: Request<{id: string}>, res: Response<ApiResponse<Task>>): Promise<void> => {
        try{
            const {id} = req.params;
            const task = await this.taskService.getById(id);

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
            handleError(res, 'Error fetching task', error)
        }
    }

    createTask = async (req: Request<{}, {}, CreateTaskDTO>, res: Response<ApiResponse<Task>>): Promise<void> => {
        try {
            const taskData: CreateTaskDTO = req.body;

            if (!taskData.title || taskData.title.trim() === '') {
                res.status(400).json({
                    success: false,
                    message: 'Title is required',
                });
                return;
            }

            if (taskData.status && !TASK_STATUSES.includes(taskData.status)) {
                res.status(400).json({
                    success: false,
                    message: `Invalid status. Must be one of: ${TASK_STATUSES.join(', ')}`,
                });
                return;
            }

            const newTask = await this.taskService.create(taskData);

            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                data: newTask,
            });
        } catch (error) {
            handleError(res, 'Error creating task', error);
        }
    }

    updateTask = async (req: Request<{id: string}, {}, UpdateTaskDTO>, res: Response<ApiResponse<Task>>): Promise<void> => {
        try {
            const {id} = req.params;

            const taskData: UpdateTaskDTO = req.body;

            if (!taskData.title && !taskData.description && !taskData.status){
                res.status(400).json({
                    success: false,
                    message: 'At least one field (title,description,status) is required to update',
                });
                return;
            }

            if (!taskData.description || taskData.description.trim() === '') {
                res.status(400).json({
                    success: false,
                    message: 'Cannot add empty descriptions',
                });
                return;
            }

            if (taskData.status && !TASK_STATUSES.includes(taskData.status)) {
                res.status(400).json({
                    success: false,
                    message: `Invalid status. Must be one of: ${TASK_STATUSES.join(', ')}`,
                });
                return;
            }


            const updatedTask = await this.taskService.update(id, taskData)

            if (!updatedTask) {
                res.status(404).json({
                    success: false,
                    message: `Task with id ${id} not found`,
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                data:  updatedTask,
            });

        } catch (error) {
            handleError(res, 'Error updating task', error);
        }
    }

    deleteTask = async (req: Request<{id: string}, {}, {}>, res: Response<ApiResponse>): Promise<void> => {
        try {
            const {id} = req.params;
        
            const deleted = await this.taskService.delete(id);

            if (!deleted) {
                 res.status(404).json({
                    success: false,
                    message: `Task with id ${id} not found`,
                });
                return;
            }

            res.status(200).json({
                    success: true,
                    message: 'Task deleted successfully',
                });
        } catch(error){
            handleError(res, 'Error deleting task', error);
        }
    }
}
