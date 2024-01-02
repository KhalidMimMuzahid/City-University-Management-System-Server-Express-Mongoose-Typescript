/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';

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

  const HandleZodError = (error: ZodError) => {
    const statusCode = 400;
    const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path?.length - 1],
        message: issue?.message,
      };
    });
    return {
      statusCode,
      message: 'Validation Error',
      errorSources,
    };
  };

  if (error instanceof ZodError) {
    const simplifiesError = HandleZodError(error);
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