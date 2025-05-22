import { Link, useLocation } from "react-router-dom";
import { getImageUrl } from "../../api/tmdb";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li className={css.item} key={movie.id}>
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
