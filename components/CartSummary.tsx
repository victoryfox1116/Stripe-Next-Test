import React, { useState, useEffect } from "react";

import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../utils/api-helpers";
import { DeleteOutlined } from "@ant-design/icons";

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    formattedTotalPrice,
    cartCount,
    cartDetails,
    redirectToCheckout,
    clearCart,
    removeItem,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const response = await fetchPostJSON(
      "/api/checkout_sessions/cart",
      cartDetails
    );

    if (response.statusCode > 399) {
      console.error(response.message);
      setErrorMessage(response.message);
      setLoading(false);
      return;
    }

    redirectToCheckout({ sessionId: response.id });
  };

  useEffect(() => {
    if (cartDetails) console.log(Object.keys(cartDetails));
  }, [cartDetails]);

  return (
    <form onSubmit={handleCheckout}>
      <h2>Cart summary</h2>
      {errorMessage ? (
        <p style={{ color: "red" }}>Error: {errorMessage}</p>
      ) : null}
      {/* This is where we'll render our cart */}
      <p suppressHydrationWarning>
        <strong>Number of Items:</strong> {cartCount}
      </p>

      {cartDetails &&
        Object.keys(cartDetails).map((item, _index) => {
          return (
            <div
              key={_index}
              className="d-flex space-between"
              style={{ marginBottom: "10px" }}
            >
              <div className="d-flex">
                <img
                  src={cartDetails[item].image}
                  alt={cartDetails[item].name}
                  width="60px"
                  height="60px"
                  style={{ marginRight: "10px" }}
                />
                <div className="d-flex space-between flex-column">
                  <label className="label-text">{cartDetails[item].name}</label>
                  <label className="label-text">
                    {cartDetails[item].price / 100}$
                  </label>
                </div>
              </div>
              <div className="d-flex">
                <button onClick={() => removeItem(cartDetails[item].id)}>
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          );
        })}
      <p suppressHydrationWarning>
        <strong>Total:</strong> {formattedTotalPrice}
      </p>

      <button
        className="cart-style-background"
        type="submit"
        disabled={cartEmpty || loading}
      >
        Checkout
      </button>
    </form>
  );
};

export default CartSummary;
