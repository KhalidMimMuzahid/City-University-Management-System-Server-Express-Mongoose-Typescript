/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

// if we use ErrorRequestHandler type we no need to declare the type of those {any Request Response NextFunction}
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // console.log({ error });
  let statusCode = error?.statusCode || 500;
  let message = error?.message || 'Something went wrong!';

  type TErrorSources = { path: string; message: string }[];
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Ami Zod Error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error,
    errorSources,
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