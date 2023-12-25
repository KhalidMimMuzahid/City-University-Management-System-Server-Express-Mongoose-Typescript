export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
};

// export type TNewUser = {
//   role: 'student' | 'faculty' | 'admin';
//   password: string;
//   id: string
// };
// export type TUserMethods = {
//   x: string;
// };
