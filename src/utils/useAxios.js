import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import baseURL from "../config";

const usersBaseURL = `${baseURL}users/`;

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
      // Отримуємо новий токен через refresh
      const response = await axios.post(`${usersBaseURL}token/refresh/`, {
        refresh: authTokens.refresh
      });

      // Оновлюємо стан
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // Повертаємо оновлений запит з новим токеном
      return {
        ...req,
        headers: {
          ...req.headers,
          Authorization: `Bearer ${response.data.access}`
        }
      };
    } catch (error) {
      console.error("Refresh token failed", error);
      return req;
    }
  });

  return axiosInstance;
};

export default useAxios;
