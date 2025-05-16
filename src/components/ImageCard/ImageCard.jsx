import css from "./ImageCard.module.css";

export default function ImageCard({ image, onClick }) {
  return (
    <div onClick={() => onClick(image)}>
      <img className={css.card} src={image.src} alt={image.alt} />
    </div>
  );
}
