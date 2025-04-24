import { useState } from "react";
import ImageGallery from "./components/imageGallery/ImageGallery";
import SearchBar from "./components/searchBar/SearchBar";
import Loader from "./components/loader/Loader";
import ErrorMessage from "./components/errorMessage/ErrorMessage";
import LoadMoreBtn from "./components/loadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import { ImageType } from "./types";

type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
};



function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchImages = async (
    query: string,
    page: number = 1
  ): Promise<void> => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=15&client_id=7ilM83FYgqO2uHQJ9vGBXrVNF29Rn-1q-MkwDLkqtU8`
      );
      const data = await response.json();

      if (page === 1) {
        setImages(data.results);
      } else {
        setImages((prevImages) => [...prevImages, ...data.results]);
      }
    } catch (err) {
      setError("Error loading images");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchImages(query, nextPage);
      return nextPage;
    });
  };

  const openModal = (image: ImageType) => {
    if (!isModalOpen) {
      setSelectedImage(image);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchBar fetchImages={fetchImages} setQuery={setQuery} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && !loading && (
        <LoadMoreBtn loadMoreImages={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={closeModal}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
