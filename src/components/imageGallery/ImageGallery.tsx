import ImageCard from "../imageCard/ImageCard";
import clsx from "clsx";
import css from "./imageGallery.module.css"

type Image = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    full: string;
    regular: string;
  };
};

type ImageGalleryProps = {
  images: Image[];
  onImageClick: (image: Image) => void;
};


export default function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  return (
    <ul className={clsx(css.ul)}>
      {images.map((image) => (
        <li className={clsx(css.li)}  key={image.id}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
