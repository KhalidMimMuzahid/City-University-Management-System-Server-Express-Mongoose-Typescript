import { z } from 'zod';

const preRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchemaByZod = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credit: z.number(),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
  }),
});

export const courseValidation = {
  createCourseValidationSchemaByZod,
  //   updateAcademicSemesterValidationSchemaByZod,
};
