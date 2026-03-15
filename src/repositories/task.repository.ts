import { PrismaClient } from "../generated/prisma/client";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";
import type { PrismaService } from "../lib/prisma";
import type { Task } from "../models/task.model";
import type { CreateTaskInput, UpdateTaskInput } from "../types/task.dto";
import type { ITaskRepository } from "./interfaces/task.repository.interface";


export class TaskRepository implements ITaskRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Task[]> {
        return this.prisma.task.findMany({
            orderBy: {createdAt: 'desc'}
        });
    }

    async findById(id: string): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: {id},
        });
    }

    async create(data: CreateTaskInput): Promise<Task> {
        return this.prisma.task.create({
            data: {
                title: data.title,
                description: data.description ?? null,
                status: data.status ?? 'PENDING',
            }
        });
    }

    async update(id: string, data: UpdateTaskInput): Promise<Task | null> {
        try {
            return await this.prisma.task.update({
                where: {id},
                data,
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                return null;
            }
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.prisma.task.delete({where: {id}});
            return true;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                return false
            }
            throw error;
        }
    }
}