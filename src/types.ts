export type ImageType = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
};

export type FetchImagesFn = (query: string, page?: number) => Promise<void>;
export type SetQueryFn = (query: string) => void;
