import AxiosInstance from "./base";

export const getMeApi = function () {
  return AxiosInstance.get("/users/me");
};

export const updateUserBaseApi = function (params: any) {
  return AxiosInstance.post("/users/baseUpdate", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const passwordChangeApi = function (params: any) {
  return AxiosInstance.post("/users/passsword/change", params);
};

export const getAllUsersApi = function (params: any) {
  return AxiosInstance.get("/users", { params });
};

export const createUserApi = function (params: any) {
  return AxiosInstance.post("/users/register", params);
};

export const updateUserApi = function (params: any) {
  return AxiosInstance.post("/users/update", params);
};

export const deleteUserApi = function (params: any) {
  return AxiosInstance.post("/users/destroy", params);
};
