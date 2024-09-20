import AxiosInstance from "./base";

export const getAllProductsApi = function (params: any) {
  return AxiosInstance.get("/products/all", { params });
};

export const getAllProductsNoPaginateApi = function (params: any) {
  return AxiosInstance.get("/products/all/noPaginate", { params });
};

export const findProductBycodeApi = function (params: any) {
  return AxiosInstance.get(`/products/findBycode/${params.code}`);
};

export const createProductApi = function (params: any) {
  return AxiosInstance.post("/products/create", params);
};

export const updateProductApi = function (params: any) {
  return AxiosInstance.post("/products/update", params);
};

export const deleteProductApi = function (params: any) {
  return AxiosInstance.post("/products/destroy", params);
};

export const getAllStockAdjustmentApi = function (params: any) {
  return AxiosInstance.get("/products/getAllStockAdjestment", { params });
};

export const createStockAdjustmentApi = function (params: any) {
  return AxiosInstance.post("/products/stockAdjestment", params);
};

export const createProductCategoryApi = function (params: any) {
  return AxiosInstance.post("/products/create/category", params);
};

export const getProductCategoriesApi = function () {
  return AxiosInstance.get("/products/get/categories");
};

export const createProductDepartmentApi = function (params: any) {
  return AxiosInstance.post("/products/create/department", params);
};

export const getProductDepartmentsApi = function () {
  return AxiosInstance.get("/products/get/departments");
};
