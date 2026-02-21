
import type { Response } from "express";

export function handleError(res: Response, message: string, error: unknown): void {
    res.status(500).json({
        success: false,
        message,
        error: error instanceof Error ? error.message : 'Unknown error',
    });
}