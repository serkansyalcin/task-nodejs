import { UNEXPECTED_ERROR } from "../constants/error.message.js";
import * as Sentry from "@sentry/node";

export class AppError extends Error {
  constructor(errorCode, statusCode) {
    super(errorCode.message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

export const errorHandler = (error, req, res, next) => {
  const errorDetails = {
    method: req.method,
    path: req.originalUrl,
    errorMessage: error.message,
    stack: error.stack,
  };

  if (error instanceof AppError) {
    return res.status(error.statusCode).json(error.errorCode);
  }

  console.error(`Error Handler Middleware - ${error.name}: ${JSON.stringify(errorDetails)}`);
  Sentry.captureException(`Error Handler Middleware - ${error.name}: ${JSON.stringify(errorDetails)}`);
  return res.status(500).send(UNEXPECTED_ERROR);
};
