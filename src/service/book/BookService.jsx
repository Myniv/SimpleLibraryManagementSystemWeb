import api from "../api";

const getAll = async (params) => {
  return await api.get("/Books", { params });
};

const getId = async (id) => {
  return await api.get(`/Books/${id}`);
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
      "/Books/search2",
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

//Changing soon
const bookRequest = async (data) => {
  return await api.post(`/Stocks/book-request`, data);
};

//Changing soon
const bookApproval = async (data) => {
  return await api.post(`/Stocks/book-approval`, data);
};

const getBookRequestList = async () => {
  return await api.get(`/Stocks/workflow-dashboard`);
};

const getDashboardList = async () => {
  return await api.get(`/Stocks/dashboard`);
};

const getBookRequestId = async (id) => {
  return await api.get(`/Stocks/request/${id}`);
};

const update = async (id, data) => {
  return await api.put(`/Books/${id}`, data);
};

const remove = async (id, deleteReason) => {
  return await api.delete(`/Books/${id}`, {
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
  bookRequest,
  bookApproval,
  getBookRequestList,
  getBookRequestId,
  getDashboardList,
};

export default BookService;
