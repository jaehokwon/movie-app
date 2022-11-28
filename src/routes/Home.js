import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import QueryString from "query-string";

function useFetch(query, page) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const sendQuery = useCallback(async () => {
    if (query === null || query === undefined || query === "") return [];
    setLoading(true);
    const response = await (await fetch(`${query}&page=${page}`)).json();
    setList((prev) => {
      return [
        ...new Set(
          [...prev, ...(response.data.movies ?? [])].map(JSON.stringify)
        ),
      ].map(JSON.parse);
    });
    setHasMore(
      response.data.movie_count >
        response.data.limit * response.data.page_number
    );
    setLoading(false);
  }, [query, page]);
  useEffect(() => {
    sendQuery();
  }, [query, sendQuery, page]);
  return { loading, list, hasMore };
}

function Home() {
  const qs = QueryString.parse(useLocation().search);
  const search = qs.search ?? "";
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, list, hasMore } = useFetch(query, page);
  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage((prev) => prev + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  useEffect(() => {
    list.length = 0;
    setQuery(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=1&sort_by=year&limit=21&query_term=${search}`
    );
    setPage(1);
  }, [search]);
  return (
    <div className={styles.container}>
      <div className={styles.movies}>
        {list.map((movie, i) => {
          const isLastElement = list.length === i + 1;
          return isLastElement ? (
            <div ref={lastMovieElementRef}>
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            </div>
          ) : (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          );
        })}
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
}

export default Home;
