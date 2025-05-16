import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { fetchImages } from "../api-unsplasch";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/Errormessage";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setCurrentPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  useEffect(() => {
    if (!query) return;

    async function fetchData() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await fetchImages(query, currentPage);
        setImages((prev) => [...prev, ...data.images]);
        setTotalPages(data.totalPages);
      } catch {
        setIsError(true);
        toast.error("Виникла помилка при завантаженні!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, currentPage]);

  const isLastPage = currentPage === totalPages;

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isError && <ErrorMessage />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && !isLastPage && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      <ImageModal
        isOpen={!!modalImage}
        onClose={closeModal}
        image={modalImage}
      />
    </div>
  );
}
