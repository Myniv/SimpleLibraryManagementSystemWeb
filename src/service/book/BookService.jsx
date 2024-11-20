import api from "../api";

const getAll = async (params) => {
  return await api.get("/api/Books", { params });
};

const getId = async (id) => {
  return await api.get(`/api/Books/${id}`);
};

const getSearch = async (
  pageNumber,
  perPage,
  keyword,
  sortBy,
  sortOrder,
  title,
  isbn,
  author,
  category,
  language
) => {
  try {
    const response = await api.post(
      "/api/Books/search",
      {
        pageNumber,
        perPage,
      },
      {
        params: {
          Keyword: keyword,
          SortBy: sortBy,
          SortOrder: sortOrder,
          Category: category,
          Language: language,
          Author: author,
          Isbn: isbn,
          Title: title,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const create = async (data) => {
  return await api.post(`/api/Books`, data);
};

const update = async (id, data) => {
  return await api.put(`/api/Books/${id}`, data);
};

const remove = async (id, deleteReason) => {
  return await api.delete(`/api/Books/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      deleteReason: deleteReason,
    },
  });
};

const BookService = {
  getAll,
  getId,
  getSearch,
  create,
  update,
  remove,
};

export default BookService;
