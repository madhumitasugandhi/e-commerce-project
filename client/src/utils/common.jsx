import axios from "axios";

const getCurrentUser = () => {
  const user = localStorage.getItem("e-commerce-user-details");
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

const getJwtToken = () => {
  const token = localStorage.getItem("e-commerce-user-token");
  return token ? `Bearer ${token}` : null;
};

const logout = () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
};

const getReadableTimestamp = (data) => {
  const dateObj = new Date(data);
  const datePart = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
  const timePart = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
  const amOrPm = dateObj.getHours() >= 12 ? "PM" : "AM";
  return `${datePart} ${timePart} ${amOrPm}`;
};

const shortText = (text, maxLength = 50) => {
  if (!text) return " ";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("e-commerce-user-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { getCurrentUser, getJwtToken, logout, getReadableTimestamp, shortText, api };
