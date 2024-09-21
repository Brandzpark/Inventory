import AxiosInstance from "./base";

export const getAllPurchaseOrdersApi = function (params: any) {
    return AxiosInstance.get("/purchaseOrder/all", { params });
};

export const getNextNumberPurchaseOrderApi = function () {
    return AxiosInstance.get("/purchaseOrder/nextNumber");
};

export const findByCodePurchaseOrderApi = function (params: any) {
    return AxiosInstance.get(`/purchaseOrder/findByCode/${params?.code}`);
};

export const createPurchaseOrderApi = function (params: any) {
    return AxiosInstance.post("/purchaseOrder/create", params);
};

export const updatePurchaseOrderApi = function (params: any) {
    return AxiosInstance.put("/purchaseOrder/update", params);
};

export const deletePurchaseOrderApi = function (params: any) {
    return AxiosInstance.post("/purchaseOrder/destroy", params);
};


export const getAllPOReceivesApi = function (params: any) {
    return AxiosInstance.get("/purchaseOrderReceived/all", params);
};

export const getNextNumberPOReceiveApi = function () {
    return AxiosInstance.get("/purchaseOrderReceived/nextNumber");
};

export const findByCodePOReceiveApi = function (params: any) {
    return AxiosInstance.get(`/purchaseOrderReceived/findByCode/${params?.code}`);
};

export const createPOReceiveApi = function (params: any) {
    return AxiosInstance.post("/purchaseOrderReceived/create", params);
};

export const updatePOReceiveApi = function (params: any) {
    return AxiosInstance.put("/purchaseOrderReceived/update", params);
};

export const deletePOReceiveApi = function (params: any) {
    return AxiosInstance.post("/purchaseOrderReceived/destroy", params);
};


export const getAllPOReturnsApi = function (params: any) {
    return AxiosInstance.get("/purchaseOrderReturnStock/all", params);
};

export const getNextNumberPOReturnApi = function () {
    return AxiosInstance.get("/purchaseOrderReturnStock/nextNumber");
};

// export const findByCodePOReturnApi = function (params: any) {
//     return AxiosInstance.get(`/purchaseOrderReturnStock/findByCode/${params?.code}`);
// };

export const createPOReturnApi = function (params: any) {
    return AxiosInstance.post("/purchaseOrderReturnStock/create", params);
};

export const updatePOReturnApi = function (params: any) {
    return AxiosInstance.put("/purchaseOrderReturnStock/update", params);
};

export const deletePOReturnApi = function (params: any) {
    return AxiosInstance.post("/purchaseOrderReturnStock/destroy", params);
};