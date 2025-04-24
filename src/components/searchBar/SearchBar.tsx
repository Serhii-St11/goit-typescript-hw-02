import clsx from "clsx";
import { useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { IoMdSearch } from "react-icons/io";
import css from "./searchBar.module.css";

type SearchBarProps = {
  fetchImages: (query: string, page: number) => void;
  setQuery: (query: string) => void;
};

export default function SearchBar({ fetchImages, setQuery }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!inputValue.trim()) {
      toast.error("You must enter text to search for images!");
      return;
    }

    setQuery(inputValue);
    fetchImages(inputValue, 1);
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={clsx(css.form)}>
        <input
          className={clsx(css.input)}
          type="text"
          value={inputValue}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setInputValue(evt.target.value)
          }
          placeholder="Search images and photos"
        />
        <button className={clsx(css.btn)} type="submit">
          <IoMdSearch size={25} />
        </button>
      </form>
    </header>
  );
}
