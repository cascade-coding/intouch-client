import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const API_URL = "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
});

export const privateApi = axios.create({
  baseURL: API_URL,
});

privateApi.interceptors.request.use(
  async function (req) {
    req.headers.Authorization = `JWT ${localStorage.getItem("access")}`;

    try {
      const accessToken = localStorage.getItem("access") as string;
      const token = jwtDecode(accessToken);
      const isExpired = dayjs.unix(token.exp as number).diff(dayjs()) < 1;

      if (!isExpired) return req;
      const refreshToken = localStorage.getItem("refresh");

      const res = await axios.post(`${API_URL}/jwt/refresh/`, {
        refresh: refreshToken,
      });

      const { access, refresh } = res.data as {
        access: string;
        refresh: string;
      };

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      req.headers.Authorization = `JWT ${access}`;

      return req;
    } catch (error) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }

    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);
