import actGetCategories from "@store/categories/actGetCategories";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categoriesSlice
  );

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);
  return { loading, error, records };
};
export default useCategories;
