import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from "express";

@Catch(EntityNotFoundError)
export class ModelNotFoundExceptionFilter implements ExceptionFilter{
    catch(exception: EntityNotFoundError, host: ArgumentsHost) {
        // throw new Error("Method not implemented.");
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        return response.status(404).json({
            error: {
                error: 'Not found',
                message: exception.message
            }
        })
    }
}