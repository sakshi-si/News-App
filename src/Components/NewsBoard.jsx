import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  
  const getNewsData = async () => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pagesize=100&page=${page}&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await res.json();

      // Adjust the pagesize based on the totalResults
      const adjustedPagesize = Math.min(data.totalResults, 100);

      setArticles((prev) => [...prev, ...data.articles]);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setArticles([]); // Reset articles when category changes
    setPage(1); // Reset page to 1 when category changes
  }, [category]);

  useEffect(() => {
    getNewsData();
  }, [category, page]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span> ({category})
      </h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={
          <h4 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h4>
        }
      >
        {articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default NewsBoard;

