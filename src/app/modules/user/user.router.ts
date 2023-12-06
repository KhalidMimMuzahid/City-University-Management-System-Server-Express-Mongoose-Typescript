import express, { Router } from 'express';
import { userControllers } from './user.controller';
// import { userControllers } from './user.controller';
// import { studentControllers } from './student.controller';

const router: Router = express.Router();

// will call controller function

router.post('/create-student', userControllers.createStudent);

export const userRoutes = router;
