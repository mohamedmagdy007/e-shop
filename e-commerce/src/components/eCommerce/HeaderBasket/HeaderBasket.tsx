import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import styles from "./styles.module.css";
import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import { Link } from "react-router-dom";
const { basketContainer, basketCart, basketQuantity } = styles;
const HeaderBasket = () => {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  return (
    <Link to={"/cart"}>
      <div className={basketContainer}>
        <div className={basketCart}>
          <ShoppingCartIcon className="w-6" />
          {totalQuantity > 0 && (
            <div className={`${basketQuantity} bg-gray-900`}>
              {totalQuantity}
            </div>
          )}
        </div>
        <h3>Cart</h3>
      </div>
    </Link>
  );
};

export default HeaderBasket;
