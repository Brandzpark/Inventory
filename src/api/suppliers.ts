import AxiosInstance from "./base";

export const getAllSuppliersApi = function (params: any) {
  return AxiosInstance.get("/suppliers/all", { params });
};

export const getAllSuppliersNoPaginateApi = function (params: any) {
  return AxiosInstance.get("/suppliers/all/noPaginate", { params });
};

export const findSupplierByCodeApi = function (params: any) {
  return AxiosInstance.get(`/suppliers/findByCode/${params.code}`);
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
