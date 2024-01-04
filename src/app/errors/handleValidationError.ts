import mongoose from 'mongoose';
import { TErrorSources } from '../interface/error';

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSources = Object.values(error?.errors)?.map(
    (each: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: each?.path,
        message: each?.message,
      };
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
