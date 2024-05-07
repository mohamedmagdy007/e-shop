import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetAllProducts from "@store/products/actGetAllProducts";
import { productsCleanUp } from "@store/products/productsSlice";
import { useEffect } from "react";

const useAllProducts = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.productsSlice
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
    isAuthenticated: userAccessToken ? true : false,
  }));
  useEffect(() => {
    dispatch(actGetAllProducts());

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch]);
  return { loading, error, productsFullInfo };
};
export default useAllProducts;
