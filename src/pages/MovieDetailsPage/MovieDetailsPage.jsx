import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { getMovieDetails } from "../../api/tmdb";
import { getImageUrl } from "../../api/tmdb";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading movie...</p>;

  return (
    <div className={css.containerDetails}>
      <Link to={backLink} className={css.backLink}>
        ← Go back
      </Link>

      <div className={css.details}>
        <img
          className={css.poster}
          src={
            getImageUrl(movie.poster_path) ||
            "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
        />

        <div className={css.text}>
          <h1 className={css.title}>{movie.title}</h1>

          <p>
            <strong>User Score:</strong> {Math.round(movie.vote_average * 10)}%
          </p>

          <h2>Overview</h2>
          <p>{movie.overview}</p>

          <h2>Genres</h2>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <ul className={css.links}>
        <li>
          <Link to="cast" state={{ from: backLink }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Suspense fallback={<p>Loading section...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
