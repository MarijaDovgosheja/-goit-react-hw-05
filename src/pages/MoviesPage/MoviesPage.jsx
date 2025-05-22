import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../api/tmdb";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";

  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!queryParam) return;
    searchMovies(queryParam).then(setMovies);
  }, [queryParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    setSearchParams({ query });
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}
