import api from "../api";

const getAllUser = async () => {
  return await api.get("/api/Users");
};

const getIdUser = async (id) => {
  return await api.get(`/api/Users/${id}`);
};

const createUser = async (data) => {
  return await api.post("/api/Users", data);
};

const updateUser = async (id, data) => {
  return await api.put(`/api/Users/${id}`, data);
};

const removeUser = async (id) => {
  return await api.delete(`/api/Users/${id}`);
};

const MemberService = {
  getAllUser,
  getIdUser,
  createUser,
  updateUser,
  removeUser,
};

export default MemberService;
