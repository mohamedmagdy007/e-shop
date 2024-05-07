import { TProduct } from "@customTypes/product";

type CartSubtotalPriceProps = { products: TProduct[] };
const CartSubTotalPrice = ({ products }: CartSubtotalPriceProps) => {
  const subtotal = products.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;
    if (quantity && typeof quantity === "number") {
      return accumulator + +price * quantity;
    } else {
      return accumulator;
    }
  }, 0);
  return (
    <div className="flex justify-between mb-4">
      <span className="font-bold">Subtotal</span>
      <span className="font-bold">{subtotal} EGP</span>
    </div>
  );
};

export default CartSubTotalPrice;
