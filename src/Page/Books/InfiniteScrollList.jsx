import { useInfiniteQuery } from "@tanstack/react-query";
import BookService from "../../service/book/BookService";
import InfiniteScroll from "react-infinite-scroll-component";

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
    <div className="container mx-auto p-4">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchNextPage}
        hasMore={!isReachingEnd}
        endMessage={
          <div className="text-center p-4 text-gray-500">
            <p>You have seen all items</p>
            <p>Total Items : {items.length} </p>
          </div>
        }
      >
        {items.map((item) => (
          <div key={item.bookId}>
            <h3 className="text-lg font-medium">
              {item.bookId} - {item.title}
            </h3>
            <p className="text-gray-600">{item.author}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollList;
