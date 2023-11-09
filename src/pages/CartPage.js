import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { ContextProvider } from "../contexts/FoodContext";

const CartPage = () => {
  const { cart, setCart } = useContext(ContextProvider);
  const [overAllPrice, setOverAllPrice] = useState(0);
  const [isDiabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const initialOverAllPrice = cart
      .map((food) => food.price)
      .reduce((prev, curr) => prev + curr, 0);
    setOverAllPrice(initialOverAllPrice);
  }, [cart]);

  const handleApplyCoupon = () => {
    setOverAllPrice((prev) => prev - 5);
    setIsDisabled(true);
  };

  const totalDeliveryTime = cart
    .map((food) => food.delivery_time)
    .reduce((prev, curr) => prev + curr, 0);

  const handleRemoveClick = (food) => {
    const updatedCart = cart.filter((f) => f.id !== food.id);
    setCart(updatedCart);
  };

  return (
    <div>
      <Header />
      <h2>Cart:</h2>
      <h3>Total Price: ${overAllPrice}</h3>
      <h3>Total Delivery time: {totalDeliveryTime} min.</h3>
      {cart.length === 0 ? null : (
        <button
          disabled={isDiabled}
          className="apply-coupon-btn"
          onClick={handleApplyCoupon}
        >
          Apply Coupon
        </button>
      )}
      <div className="foods">
        {cart.length === 0 ? (
          <h1>You haven't added anything. Go and grab something...</h1>
        ) : (
          cart.map((food) => {
            const { id, name, description, price, image, delivery_time } = food;
            return (
              <div key={id} className="individual-food hover-item">
                <img src={image} alt="image" className="image" />
                <p>
                  <b>Name: </b>
                  {name}
                </p>
                <p>
                  <b>Description: </b>
                  {description}
                </p>
                <p>Price: ${price}</p>
                <p>Delivery time: {delivery_time}</p>
                <button onClick={() => handleRemoveClick(food)}>
                  Remove from Cart
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartPage;
