export type UserRole = 'Admin' | 'Sales';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}
