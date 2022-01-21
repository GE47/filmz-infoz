import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "underscore";

const usePageData = (
  selectedItem: string | undefined,
  param: string | undefined,
  fn: Function
) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [currentItem, setCurrentItem] = useState(selectedItem || null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!param || !selectedItem) return;

    if (currentItem !== param) {
      setPageNumber(1);
    }

    setCurrentItem(param);

    dispatch(fn({ type: param, page: pageNumber }));
  }, [dispatch, param, selectedItem, pageNumber, currentItem, fn]);

  const nextPageHandler = (totalPages: number) => {
    if (totalPages > pageNumber) {
      setPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  const handleLoadMore = debounce(nextPageHandler, 500, true);

  return { handleLoadMore };
};

export default usePageData;
