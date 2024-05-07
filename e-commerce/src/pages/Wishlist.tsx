import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import { GridList } from "@components/common";
import { Product } from "@components/eCommerce";

import actGetWishlist from "@store/wishlist/actGetWishlist";
import { productsFullInfoCleanUp } from "@store/wishlist/wishlistSlice";
import Loading from "@components/feedback/Loading";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(actGetWishlist("productsFullInfo"));
    return () => {
      dispatch(productsFullInfoCleanUp());
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
    isAuthenticated: true,
  }));

  return (
    <>
      <h1>Your Wishlist</h1>
      <Loading status={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
