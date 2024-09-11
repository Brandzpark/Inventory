import { getCookie } from "cookies-next";
import instance from "./instance";
import { isAxiosError } from "axios";
import { toast } from "sonner";

instance.interceptors.request.use(
  async function (config) {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = "bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (isAxiosError(error)) {
      if (error.status == 403) {
        toast.error(error.response?.data.message, { id: "403Error" });
      }
      if (error.status == 401) {
        toast.error("Session expired, please login", { id: "401Error" });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
