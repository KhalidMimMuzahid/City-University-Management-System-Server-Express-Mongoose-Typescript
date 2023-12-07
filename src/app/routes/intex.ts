import express from 'express';
import { studentRoutes } from '../modules/student/student.router';
import { userRoutes } from '../modules/user/user.router';

const router = express.Router();

const moduleRoutes = [
  { path: '/students', route: studentRoutes },
  { path: '/users', route: userRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
