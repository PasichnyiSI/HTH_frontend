import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Основний базовий URL для всіх запитів
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://hth-backend-tks7.onrender.com/"
    : "http://127.0.0.1:8000/";

// Базовий URL для авторизації (рефреш токену)
const usersBaseURL =
  process.env.NODE_ENV === "production"
    ? "https://hth-backend-tks7.onrender.com/users/"
    : "http://127.0.0.1:8000/users/";

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

      // **ОНОВЛЕННЯ req.headers НЕ ПРАЦЮЄ, ПОТРІБНО ПОВЕРНУТИ НОВИЙ req!**
      return {
        ...req,
        headers: {
          ...req.headers,
          Authorization: `Bearer ${response.data.access}`
        }
      };
    } catch (error) {
      console.error("Refresh token failed", error);
      return req; // Повертаємо старий req, якщо щось пішло не так
    }
  });

  return axiosInstance;
};

export default useAxios;
