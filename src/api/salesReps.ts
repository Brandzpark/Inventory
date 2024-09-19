import AxiosInstance from "./base";

export const getAllSalesRepsApi = function (params: any) {
  return AxiosInstance.get("/salesRep/all", { params });
};

export const findSalesRepBycodeApi = function (params: any) {
  return AxiosInstance.get(`/salesRep/findBycode/${params.code}`);
};

export const createSalesRepApi = function (params: any) {
  return AxiosInstance.post("/salesRep/create", params);
};

export const updateSalesRepApi = function (params: any) {
  return AxiosInstance.post("/salesRep/update", params);
};

export const deleteSalesRepApi = function (params: any) {
  return AxiosInstance.post("/salesRep/destroy", params);
};
