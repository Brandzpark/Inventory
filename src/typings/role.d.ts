export type IRole = {
  _id: string;
  name: string;
  permissions: string[];
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type IPermissions = {
  group: string;
  permissions: { key: string; value: string }[];
};
