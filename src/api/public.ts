import AxiosInstance from "./base";

export const loginApi = function (params: any) {
  return AxiosInstance.post("/users/login", params);
};