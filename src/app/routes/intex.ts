import express from 'express';
import { studentRoutes } from '../modules/student/student.routes';
import { userRoutes } from '../modules/user/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { facultyRoutes } from '../modules/Faculty/faculty.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/students', route: studentRoutes },
  { path: '/faculties', route: facultyRoutes },
  { path: '/admins', route: AdminRoutes },

  { path: '/users', route: userRoutes },
  { path: '/academic-semesters', route: academicSemesterRoutes },
  { path: '/academic-faculties', route: academicFacultyRoutes },
  { path: '/academic-departments', route: academicDepartmentRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;


