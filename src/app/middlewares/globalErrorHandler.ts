/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';

// if we use ErrorRequestHandler type we no need to declare the type of those {any Request Response NextFunction}
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // console.log({ error });
  let statusCode = error?.statusCode || 500;
  let message = error?.message || 'Something went wrong!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];
  if (error instanceof ZodError) {
    const simplifiesError = handleZodError(error);
    // errorSources

    statusCode = simplifiesError?.statusCode;
    message = simplifiesError?.message;
    errorSources = simplifiesError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    console.log('ami mongoose validation error');

    const simplifiesError = handleValidationError(error);
    // errorSources

    statusCode = simplifiesError?.statusCode;
    message = simplifiesError?.message;
    errorSources = simplifiesError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    // error,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;         


//pattern 
/*
success
message
errorSources : [
  path: "",
  message: "Something"
]
stack
*/