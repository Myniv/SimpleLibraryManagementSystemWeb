import { useInfiniteQuery } from "@tanstack/react-query";
import BookService from "../../service/book/BookService";
import InfiniteScroll from "react-infinite-scroll-component";
import CardBook from "../../Component/Elements/CardBook";
import LoadingState from "../../Component/Elements/LoadingState";
import { Tab, Tabs } from "react-bootstrap";

const PAGE_SIZE = 3;
const fetchDataFromApi = async ({ pageParam }) => {
  const { data } = await BookService.getSearch(pageParam, PAGE_SIZE);
  return data;
};

const InfiniteScrollList = () => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["infiniteData"],
    queryFn: fetchDataFromApi,
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

  return (
    <>
      <Tabs
        defaultActiveKey="search"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="search" title="Search">
          Search
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

export default InfiniteScrollList;
