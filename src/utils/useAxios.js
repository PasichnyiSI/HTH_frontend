import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Основний базовий URL для всіх запитів
const baseURL = "http://127.0.0.1:8000/";

// Зробимо запит на авторизацію (для рефреша токенів) з іншою URL
const usersBaseURL = "http://127.0.0.1:8000/users/";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    if (!authTokens) return req;

    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      // Запит на рефреш токенів з іншого базового URL
      const response = await axios.post(`${usersBaseURL}token/refresh/`, {
        refresh: authTokens.refresh
      });

      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      req.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      console.error("Refresh token failed", error);
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
