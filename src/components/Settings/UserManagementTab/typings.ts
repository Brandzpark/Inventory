export type IUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  permissions: string[];
  role: string;
  isActive: boolean;
  password: string;
  image?: string;
};
