import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundErrorHandler from './app/middlewares/notFOund';
import router from './app/routes/intex';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.use(globalErrorHandler);
app.use('*', notFoundErrorHandler);

export default app;
