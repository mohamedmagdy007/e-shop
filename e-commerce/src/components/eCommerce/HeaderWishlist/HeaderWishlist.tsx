import { useAppSelector } from "@store/hooks";
import Logo from "@assets/wish-list.svg?react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
const { container, totalNum, iconWrapper } = styles;
const HeaderWishlist = () => {
  const totalQuantity = useAppSelector((state) => state.wishlist.itemsId);
  return (
    <Link to={"/wishlist"}>
      <div className={container}>
        <div className={iconWrapper}>
          <Logo title="basket icon" />
          {totalQuantity.length > 0 && (
            <div className={`${totalNum} bg-gray-900`}>
              {totalQuantity.length}
            </div>
          )}
        </div>
        <h3>Wishlist</h3>
      </div>
    </Link>
  );
};

export default HeaderWishlist;
