import { memo, useEffect, useState } from "react";
import { TProduct } from "@customTypes/product";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hooks";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";
import actLikeToggle from "@store/wishlist/actLikeToggle";
import { Modal } from "react-bootstrap";

const Product = memo(
  ({
    id,
    title,
    price,
    img,
    quantity,
    max,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();
    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };
    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };
    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>
        <div
          className={"basis-1/4 mx-3 mb-5 flex flex-col items-center relative"}
        >
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={likeToggleHandler}
          >
            {isLiked ? (
              <HeartIconFill width={45} color="#F00" />
            ) : (
              <HeartIcon width={45} />
            )}
          </div>
          <div className={"h-80 mb-1"}>
            <img src={img} alt={title} className="w-full h-full  rounded-md" />
          </div>
          <h2>{title}</h2>
          <h3>{price} EGP</h3>
          <p className="text-sm">
            {quantityReachedToMax
              ? "You reach to the limit"
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
          <button
            className="border bg-indigo-950 text-white py-2 px-3 rounded-md disabled:bg-slate-400"
            disabled={isBtnDisabled || quantityReachedToMax}
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
        </div>
      </>
    );
  }
);

export default Product;
