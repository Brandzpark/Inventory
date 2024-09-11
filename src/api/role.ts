import AxiosInstance from "./base";

export const getAllRolesApi = function (params: any) {
  return AxiosInstance.get("/roles/all", params);
};

export const getAllPermissionsApi = function () {
  return AxiosInstance.get("/permissions/permissions.json");
};

export const createRoleApi = function (params: any) {
  return AxiosInstance.post("/roles/create", params);
};

export const updateRoleApi = function (params: any) {
  return AxiosInstance.put("/roles/update", params);
};
