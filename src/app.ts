import express, { Application } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.router';
import { userRoutes } from './app/modules/user/user.router';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/users', userRoutes);

export default app;
