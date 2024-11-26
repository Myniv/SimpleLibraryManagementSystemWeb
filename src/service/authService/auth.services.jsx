import api from "../api";

const register = async (userData) => {
  const response = await api.post("/Auth/register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await api.post("/Auth/login", userData);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async (refreshToken) => {
  await api.post("Auth/logout", {
    refreshToken,
  });
  localStorage.removeItem("user");
};

const refreshToken = async () => {
  const response = await api.post("/Auth/refresh-token");
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
