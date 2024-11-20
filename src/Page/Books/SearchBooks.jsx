import { useInfiniteQuery } from "@tanstack/react-query";
import BookService from "../../service/book/BookService";
import InfiniteScroll from "react-infinite-scroll-component";
import CardBook from "../../Component/Elements/CardBook";
import LoadingState from "../../Component/Elements/LoadingState";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";

const PAGE_SIZE = 3;
const fetchDataFromApi = async ({
  pageParam,
  keyword,
  title,
  isbn,
  author,
  category,
  language,
}) => {
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
  return data;
};

const SearchBooks = () => {
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");

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

  const items = data?.pages.flatMap((page) => page.data) ?? [];
  const isEmpty = items.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data.pages[data.pages.length - 1]?.data.length < PAGE_SIZE);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleIsbn = (e) => {
    setIsbn(e.target.value);
  };
  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };
  return (
    <>
      <Tabs
        defaultActiveKey="search"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="search" title="Search">
          <div className="p-3 border justify-content-center">
            <Form>
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
                    onChange={handleSearch}
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
                    onChange={handleTitle}
                  />
                </Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="title">ISBN</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="number"
                    placeholder="ISBN"
                    id="isbn"
                    name="isbn"
                    onChange={handleIsbn}
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
                    onChange={handleAuthor}
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
                    onChange={handleCategory}
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
                    onChange={handleLanguage}
                  />
                </Col>
              </Row>

              <Col md={3}>
                <Button variant="warning" type="submit" className="me-3">
                  Cari
                </Button>
                <Button variant="warning">Reset</Button>
              </Col>
            </Form>
          </div>{" "}
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
                  <p>Total Items : {items.length} </p>
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
                {items.map((item) => (
                  <CardBook
                    key={item.bookId}
                    cardAuthor={item.author}
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
