import clsx from "clsx";
import css from "./loadMoreBtn.module.css";

type LoadMoreBtnProps = {
  loadMoreImages: () => void;
};

export default function LoadMoreBtn({ loadMoreImages }: LoadMoreBtnProps) {
  return (
    <div className={clsx(css.loadMore_btn)}>
      <button className={clsx(css.btn)} onClick={loadMoreImages}>
        Load more
      </button>;
    </div>
  );
}
