import api from "../api";

const getAllUser = async () => {
  return await api.get("/Users");
};

const getIdUser = async (id) => {
  return await api.get(`/Users/${id}`);
};

const createUser = async (data) => {
  return await api.post("/Users", data);
};

const updateUser = async (id, data) => {
  return await api.put(`/Users/${id}`, data);
};

const removeUser = async (id) => {
  return await api.delete(`/Users/${id}`);
};

const MemberService = {
  getAllUser,
  getIdUser,
  createUser,
  updateUser,
  removeUser,
};

export default MemberService;
