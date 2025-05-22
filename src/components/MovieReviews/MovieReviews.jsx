import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieReviews } from "../../api/tmdb";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <p>
            <strong>{review.author}</strong>: {review.content}
          </p>
        </li>
      ))}
    </ul>
  );
}
