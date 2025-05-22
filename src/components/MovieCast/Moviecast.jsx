import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../api/tmdb";
import { getImageUrl } from "../../api/tmdb";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then(setCast);
  }, [movieId]);

  return (
    <ul className={css.castList}>
      {cast.map((actor) => (
        <li className={css.castItem} key={actor.cast_id}>
          <span className={css.castItemName}>{actor.name}</span>
          <img
            src={
              getImageUrl(actor.profile_path) ||
              "https://via.placeholder.com/150x200?text=No+Photo"
            }
            alt={actor.name}
          />
        </li>
      ))}
    </ul>
  );
}
