import { TProduct } from "@customTypes/product";
import styles from "./styles.module.css";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;
type CartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};
const CartItems = ({
  id,
  title,
  img,
  price,
  max,
  quantity,
  changeQuantityHandler,
  removeItemHandler,
}: CartItemProps) => {
  const renderOptions = Array(max)
    .fill(0)
    .map((_, idx) => {
      const quantity = ++idx;
      return (
        <option value={quantity} key={quantity}>
          {quantity}
        </option>
      );
    });
  const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +event.target.value;
    changeQuantityHandler(id, quantity);
  };

  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <div className={productInfo}>
          <h2 className="font-bold text-lg">{title}</h2>
          <h3 className="font-semibold text-lg">{price} EGP</h3>
          <button
            onClick={() => removeItemHandler(id)}
            className="mt-auto bg-red-900 text-white py-2 rounded-md"
          >
            Remove
          </button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="block mb-1">Quantity</span>
        <select
          aria-label="Default select example"
          className="border rounded-md px-3 py-1"
          value={quantity}
          onChange={changeQuantity}
        >
          {renderOptions}
        </select>
      </div>
    </div>
  );
};

export default CartItems;
