import AxiosInstance from "./base";

export const getAllSuppliersApi = function (params: any) {
  return AxiosInstance.get("/suppliers/all", { params });
};

export const findSupplierBycodeApi = function (params: any) {
  return AxiosInstance.get(`/suppliers/findBycode/${params.code}`);
};

export const createSupplierApi = function (params: any) {
  return AxiosInstance.post("/suppliers/create", params);
};

export const updateSupplierApi = function (params: any) {
  return AxiosInstance.post("/suppliers/update", params);
};

export const deleteSupplierApi = function (params: any) {
  return AxiosInstance.post("/suppliers/destroy", params);
};
