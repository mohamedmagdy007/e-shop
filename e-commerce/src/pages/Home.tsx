import { GridList } from "@components/common";
import { Category, Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import actGetCategories from "@store/categories/actGetCategories";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetAllProducts from "@store/products/actGetAllProducts";
import { productsCleanUp } from "@store/products/productsSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categoriesSlice
  );
  const { records: recordsProduct } = useAppSelector(
    (state) => state.productsSlice
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const productsFullInfo = recordsProduct.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
    isAuthenticated: userAccessToken ? true : false,
  }));

  useEffect(() => {
    dispatch(actGetCategories());
    dispatch(actGetAllProducts());

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch]);
  return (
    <>
      <Loading status={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
        <hr style={{ marginBottom: "15px" }} />{" "}
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Home;
