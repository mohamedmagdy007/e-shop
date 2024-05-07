import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetProductsByCatPrefix from "@store/products/actGetProductsByCatPrefix";
import { productsCleanUp } from "@store/products/productsSlice";

const useProductsCat = () => {
  const params = useParams();
  const productPrefix = params.prefix;
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.productsSlice
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  useEffect(() => {
    const promise = dispatch(
      actGetProductsByCatPrefix(params.prefix as string)
    );

    return () => {
      dispatch(productsCleanUp());
      promise.abort();
    };
  }, [dispatch, params]);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: wishListItemsId.includes(el.id),
    isAuthenticated: userAccessToken ? true : false,
  }));

  return { loading, error, productsFullInfo, productPrefix };
};

export default useProductsCat;
