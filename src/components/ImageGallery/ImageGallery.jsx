import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images, onImageClick }) {
  if (!Array.isArray(images) || images.length === 0) {
    return;
  }
  return (
    <ul className={css.galleryList}>
      {images.map((image) => (
        <li className={css.galleryItem} key={image.id}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
