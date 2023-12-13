import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      {
        message: 'First name must be capitalized',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name must contain only alphabets',
    }),
});

const createGuardianValidationSchema = z.object({
  father: z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactName: z.string().min(1),
  }),
  mother: z.object({
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactName: z.string().min(1),
  }),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const createEmergencyContactValidationSchema = z.object({
  relation: z.enum(['Father', 'Mother', 'Brother']),
  contactNo: z.string().min(1),
});

const createStudentValidationSchemaByZod = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContact: createEmergencyContactValidationSchema,
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,

      admissionSemester_id: z.string(),
      academicDepartment_id: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z
  .object({
    firstName: z
      .string()
      .min(1)
      .max(20)
      .refine(
        (value) =>
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() ===
          value,
        {
          message: 'First name must be capitalized',
        },
      )
      .optional(),
    middleName: z.string().optional(),
    lastName: z
      .string()
      .min(1)
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: 'Last name must contain only alphabets',
      })
      .optional(),
  })
  .optional();

const updateGuardianValidationSchema = z
  .object({
    father: z
      .object({
        fatherName: z.string().min(1).optional(),
        fatherOccupation: z.string().min(1).optional(),
        fatherContactName: z.string().min(1).optional(),
      })
      .optional(),
    mother: z
      .object({
        motherName: z.string().min(1).optional(),
        motherOccupation: z.string().min(1).optional(),
        motherContactName: z.string().min(1).optional(),
      })
      .optional(),
  })
  .optional();

const updateLocalGuardianValidationSchema = z
  .object({
    name: z.string().min(1).optional(),
    occupation: z.string().min(1).optional(),
    contactNo: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
  })
  .optional();

const updateEmergencyContactValidationSchema = z
  .object({
    relation: z.enum(['Father', 'Mother', 'Brother']).optional(),
    contactNo: z.string().min(1).optional(),
  })
  .optional();

const updateStudentValidationSchemaByZod = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameValidationSchema,
        gender: z.enum(['Male', 'Female', 'Other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().min(1).optional(),
        emergencyContact: updateEmergencyContactValidationSchema,
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
          .optional(),
        presentAddress: z.string().min(1).optional(),
        permanentAddress: z.string().min(1).optional(),
        guardian: updateGuardianValidationSchema,
        localGuardian: updateLocalGuardianValidationSchema,

        admissionSemester_id: z.string().optional(),
        academicDepartment_id: z.string().optional(),
        profileImage: z.string().optional(),
      })
      .optional(),
  }),
});

export const studentValidations = {
  createStudentValidationSchemaByZod,
  updateStudentValidationSchemaByZod,
};
