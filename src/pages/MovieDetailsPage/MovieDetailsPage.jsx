import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, Suspense } from "react";
import { getMovieDetails } from "../../api/tmdb";
import { getImageUrl } from "../../api/tmdb";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading movie...</p>;

  return (
    <div className={css.containerDetails}>
      <Link to={backLinkRef.current} className={css.backLink}>
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
          <Link to="cast" state={{ from: backLinkRef.current }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLinkRef.current }}>
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
