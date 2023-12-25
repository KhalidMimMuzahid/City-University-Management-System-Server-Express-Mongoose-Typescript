import { z } from 'zod';

const createAcademicDepartmentValidationSchemaByZod = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department name must be string',
      required_error: 'Academic department name is required',
    }),
    academicFaculty_id: z.string({
      invalid_type_error: 'Academic faculty_id must be string',
      required_error: 'Academic faculty_id is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchemaByZod = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department name must be string',
        required_error: 'Academic department name is required',
      })
      .optional(),
    academicFaculty_id: z
      .string({
        invalid_type_error: 'Academic faculty_id must be string',
        required_error: 'Academic faculty_id is required',
      })
      .optional(),
  }),
});

export const academicDepartmentValidation = {
  createAcademicDepartmentValidationSchemaByZod,
  updateAcademicDepartmentValidationSchemaByZod,
};
