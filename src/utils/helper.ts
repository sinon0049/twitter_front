import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";

const alert = {
  successMsg: function (msg: string) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      showConfirmButton: false,
      timer: 5000,
      text: msg,
    });
  },
  errorMsg: function (msg: string) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      showConfirmButton: false,
      timer: 5000,
      text: msg,
    });
  },
  warningMsg: function (msg: string) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      showConfirmButton: false,
      timer: 5000,
      text: msg,
    });
  },
};

const apiHelper = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiHelper.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (err: AxiosError): Promise<AxiosError> => Promise.reject(err)
);

export const api = apiHelper;
export const swalAlert = alert;
