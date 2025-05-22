import axios from "axios";

// ⚠️ Замініть цей токен на свій з TMDB -> API Read Access Token (v4 auth)
const BEARER_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWY1OTMzMmU5MzY5ZjI2YjhkNTFhYmU0NjdmMjQ3YyIsIm5iZiI6MTc0NzM3ODQ2Mi4xNDEsInN1YiI6IjY4MjZlMTFlNzYyYjg4NWFlODc2ODE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3iLyzhKVd1cXlzWvrCGDkhTSqhXwNE2swLBO927gUfU";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: BEARER_TOKEN,
  },
});

// 🟡 Трендові фільми (для головної сторінки)
export const fetchTrendingMovies = async () => {
  const response = await axiosInstance.get("/trending/movie/day");
  return response.data.results;
};

// 🟡 Пошук фільму за ключовим словом
export const searchMovies = async (query) => {
  const response = await axiosInstance.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return response.data.results;
};

// 🟡 Детальна інформація про фільм
export const getMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });
  return response.data;
};

// 🟡 Акторський склад
export const getMovieCredits = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

// 🟡 Огляди на фільм
export const getMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

// 🖼 Додатково: функція для формування повної URL картинки
export const getImageUrl = (path, size = "w500") => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
};
