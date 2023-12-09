import { z } from 'zod';

const createAcademicFacultyValidationSchemaByZod = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be string',
    }),
  }),
});

const updateAcademicFacultyValidationSchemaByZod = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be string',
    }),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyValidationSchemaByZod,
  updateAcademicFacultyValidationSchemaByZod,
};
