import express from 'express';
import { studentRoutes } from '../modules/student/student.routes';
import { userRoutes } from '../modules/user/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';

const router = express.Router();

const moduleRoutes = [
  { path: '/students', route: studentRoutes },
  { path: '/users', route: userRoutes },
  { path: '/academic-semesters', route: academicSemesterRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;


