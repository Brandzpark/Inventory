import AxiosInstance from "./base";

export const getAllCustomersApi = function (params: any) {
  return AxiosInstance.get("/customers/all", { params });
};

export const getAllCustomersNoPaginateApi = function (params: any) {
  return AxiosInstance.get("/customers/all/noPaginate", { params });
};

export const findCustomerBycodeApi = function (params: any) {
  return AxiosInstance.get(`/customers/findBycode/${params.code}`);
};

export const createCustomerApi = function (params: any) {
  return AxiosInstance.post("/customers/create", params);
};

export const updateCustomerApi = function (params: any) {
  return AxiosInstance.post("/customers/update", params);
};

export const deleteCustomerApi = function (params: any) {
  return AxiosInstance.post("/customers/destroy", params);
};
