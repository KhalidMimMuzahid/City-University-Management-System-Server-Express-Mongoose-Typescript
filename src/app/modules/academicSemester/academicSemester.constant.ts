import {
  TAcademicSemesterCode,
  TAcademicSemesterMonth,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMapper,
} from './academicSemester.interface';

export const AcademicSemesterMonths: TAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterNames: TAcademicSemesterName[] = [
  'Spring',
  'Summer',
  'Fall',
];

export const AcademicSemesterCodes: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];
export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Spring: '01',
  Summer: '02',
  Fall: '03',
};