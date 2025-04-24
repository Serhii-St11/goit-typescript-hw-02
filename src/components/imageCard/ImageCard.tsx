import clsx from "clsx";
import css from "./imageCard.module.css"

type Image = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    full: string;
    regular: string;
  };
};

type ImageCardProps = {
  image: Image;
  onImageClick: (image: Image) => void;
};

export default function ImageCard({ image, onImageClick }: ImageCardProps) {
  return (
    <div className={clsx(css.img_card)} onClick={() => onImageClick(image)}>
      <img
        className={clsx(css.img)}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
}
