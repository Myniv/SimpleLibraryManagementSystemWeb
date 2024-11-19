import api from "../api";

const getAll = async (params) => {
  return await api.get("/Books", { params });
};

const getId = async (id) => {
  return await api.get(`/Books/${id}`);
};

const getSearch = async (pageNumber, perPage, keyword, sortBy, sortOrder) => {
  try {
    const response = await api.post(
      "/api/Books/search",
      {
        pageNumber,
        perPage,
      },
      {
        params: { Keyword: keyword, SortBy: sortBy, SortOrder: sortOrder },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const create = async (data) => {
  return await api.post(`/Books`, data);
};

const update = async (id, data) => {
  return await api.put(`/Books/${id}`, data);
};

const remove = async (id) => {
  return await api.delete(`/Books${id}`);
};

const UserService = {
  getAll,
  getId,
  getSearch,
  create,
  update,
  remove,
};

export default UserService;
