import { CartItemList } from "@components/eCommerce";
import CartSubTotalPrice from "@components/eCommerce/CartSubTotalPrice/CartSubTotalPrice";
import Loading from "@components/feedback/Loading";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { loading, error, products, changeQuantityHandler, removeItemHandler } =
    useCart();

  return (
    <>
      <Loading status={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubTotalPrice products={products} />
          </>
        ) : (
          "Your Cart is empty"
        )}
      </Loading>
    </>
  );
};

export default Cart;
