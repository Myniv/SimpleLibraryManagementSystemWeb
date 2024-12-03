import { useInfiniteQuery } from "@tanstack/react-query";
import BookService from "../../service/book/BookService";
import InfiniteScroll from "react-infinite-scroll-component";
import CardBook from "../../Component/Elements/CardBook";
import LoadingState from "../../Component/Elements/LoadingState";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";

const PAGE_SIZE = 3;

//USE THE LAST COMMIT OF THE SEARCH BOOKS AND THE LAST BACKEND API (FROM ASSIGNMENT 5 BACKEND AND FRONT END)
//CAUSE THIS IS THE ERROR ONE, AND THE LAST BEFORE THIS IS THE WORKED ONE

const fetchDataFromApi = async ({
  pageParam,
  keyword,
  title,
  isbn,
  author,
  category,
  language,
}) => {
  try {
    const { data } = await BookService.getSearch(
      pageParam,
      PAGE_SIZE,
      keyword,
      "",
      "",
      title,
      isbn,
      author,
      category,
      language
    );
    console.log("Fetched Data from API:", data); // Debugging API response
    return { data: data.data }; // Ensure returned data matches expected structure
  } catch (error) {
    console.error("Error fetching data:", error); // Handle API errors
    throw error;
  }
};

const SearchBooks = () => {
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");

  const [key, setKey] = useState("search");

  const [formData, setFormData] = useState({
    keyword: "",
    title: "",
    isbn: "",
    author: "",
    category: "",
    language: "",
  });

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [
      "infiniteData",
      keyword,
      title,
      isbn,
      author,
      category,
      language,
    ],
    queryFn: ({ pageParam }) =>
      fetchDataFromApi({
        pageParam,
        keyword,
        title,
        isbn,
        author,
        category,
        language,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const items = data?.pages?.flatMap((page) => page.data) ?? [];
  console.log(items);
  const isEmpty = items.length === 0;
  const isReachingEnd =
    isEmpty || (data && data.pages[data.pages.length - 1]?.length < PAGE_SIZE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(formData.keyword);
    setTitle(formData.title);
    setIsbn(formData.isbn);
    setAuthor(formData.author);
    setCategory(formData.category);
    setLanguage(formData.language);
    setKey("searchList");
  };

  const onCancel = () => {
    setFormData({
      keyword: "",
      title: "",
      isbn: "",
      author: "",
      category: "",
      language: "",
    });
  };

  return (
    <>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="search" title="Search">
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-3 border" style={{ width: "50%" }}>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3 align-items-center">
                  <Col md={3}>
                    <Form.Label htmlFor="keyword">Search</Form.Label>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Keyword"
                      id="keyword"
                      name="keyword"
                      onChange={handleChange}
                      value={formData.keyword}
                    />
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <Col md={3}>
                    <Form.Label htmlFor="title">Title</Form.Label>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      id="title"
                      name="title"
                      onChange={handleChange}
                      value={formData.title}
                    />
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <Col md={3}>
                    <Form.Label htmlFor="isbn">ISBN</Form.Label>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="number"
                      placeholder="ISBN"
                      id="isbn"
                      name="isbn"
                      onChange={handleChange}
                      value={formData.isbn}
                    />
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <Col md={3}>
                    <Form.Label htmlFor="author">Author</Form.Label>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Author"
                      id="author"
                      name="author"
                      onChange={handleChange}
                      value={formData.author}
                    />
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <Col md={3}>
                    <Form.Label htmlFor="category">Category</Form.Label>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Category"
                      id="category"
                      name="category"
                      onChange={handleChange}
                      value={formData.category}
                    />
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <Col md={3}>
                    <Form.Label htmlFor="language">Language</Form.Label>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Language"
                      id="language"
                      name="language"
                      onChange={handleChange}
                      value={formData.language}
                    />
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className="me-3">
                  Search
                </Button>
                <Button variant="danger" onClick={onCancel}>
                  Reset
                </Button>
              </Form>
            </div>
          </div>
        </Tab>
        <Tab eventKey="searchList" title="Search List">
          <div className="container mx-auto p-4">
            <InfiniteScroll
              dataLength={items.length}
              next={fetchNextPage}
              hasMore={!isReachingEnd}
              loader={<LoadingState />}
              endMessage={
                <div className="text-center p-4 text-gray-500">
                  <p>You have seen all items</p>
                  <p>Total Items: {items.length}</p>
                </div>
              }
            >
              <div
                className="grid gap-4"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {items.map((item, index) => (
                  <CardBook
                    key={item.bookId || index}
                    cardCategory={item.category}
                    cardId={item.bookId}
                    cardTitle={item.title}
                    cardIsbn={item.isbn}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default SearchBooks;
