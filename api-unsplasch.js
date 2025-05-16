import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
export const fetchImages = async (query, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: query,
      page: currentPage,
      per_page: 12,
      client_id: "01PJV5YrBOMWGIQnnzQ-A5BYaJUKwXw773jGaqRcDNc",
    },
  });

  return {
    images: response.data.results.map((img) => ({
      id: img.id,
      src: img.urls.small,
      alt: img.description || "Image",
      fullSrc: img.urls.regular,
    })),
    totalPages: response.data.total_pages,
  };
};
