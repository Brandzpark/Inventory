export type IUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  permissions: string[];
  role: string;
  image?: string;
};
