import api from "../api";

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async (refreshToken) => {
  await api.post("auth/logout", {
    refreshToken,
  });
  localStorage.removeItem("user");
};

const refreshToken = async () => {
  const response = await api.post("/auth/refresh-token");
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};

const AuthService = {
  register,
  login,
  logout,
  refreshToken,
};

export default AuthService;
