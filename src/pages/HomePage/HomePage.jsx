import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdb";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: "/" }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
