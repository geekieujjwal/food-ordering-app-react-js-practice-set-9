import React, { useContext, useState } from "react";

import Header from "../components/Header";
import { ContextProvider } from "../contexts/FoodContext";
import { NavLink } from "react-router-dom";

const MenuPage = () => {
  const { foodsArr, handleAddToCartClick, cart } = useContext(ContextProvider);

  const [filters, setFilters] = useState({
    isVeg: false,
    isSpicy: false,
    priceType: "none",
  });
  const [inputText, setInputText] = useState("");

  const checkTypeFilteredFoods = (arr) => {
    if (filters.isVeg && filters.isSpicy) {
      return arr.filter((food) => food.is_vegetarian && food.is_spicy);
    } else if (filters.isSpicy) {
      return arr.filter((food) => food.is_spicy);
    } else if (filters.isVeg) {
      return arr.filter((food) => food.is_vegetarian);
    } else {
      return arr;
    }
  };

  const checkPriceFilteredFoods = (arr) => {
    if (filters.priceType === "inc") {
      return arr.sort((a, b) => a.price - b.price);
    } else if (filters.priceType === "dec") {
      return arr.sort((a, b) => b.price - a.price);
    } else {
      return arr;
    }
  };
  const typeFilteredFoods = checkTypeFilteredFoods(foodsArr);
  const priceFilteredFoods = checkPriceFilteredFoods(typeFilteredFoods);
  const filteredFoods = priceFilteredFoods.filter((food) =>
    food.name.toLowerCase().includes(inputText.toLowerCase())
  );

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCheckBoxClick = (e) => {
    if (e.target.value === "veg") {
      setFilters((prev) => ({ ...prev, isVeg: !prev.isVeg }));
    } else if (e.target.value === "spicy") {
      setFilters((prev) => ({ ...prev, isSpicy: !prev.isSpicy }));
    }
  };
  const handleRadioClick = (e) => {
    setFilters((prev) => ({ ...prev, priceType: e.target.value }));
  };

  return (
    <div>
      <Header />
      <h3>Filters:</h3>
      <div className="inputs">
        <input
          className="search-bar"
          type="text"
          placeholder="Search food here..."
          onChange={handleChange}
        />
        <div>
          <input
            type="checkbox"
            id="veg"
            value="veg"
            checked={filters.isVeg}
            onChange={handleCheckBoxClick}
          />
          <label htmlFor="veg">Veg</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="spicy"
            checked={filters.isSpicy}
            value="spicy"
            onChange={handleCheckBoxClick}
          />
          <label htmlFor="spicy">Spicy</label>
        </div>
      </div>
      <div className="sort-price">
        <div>
          <input
            type="radio"
            id="inc"
            value="inc"
            name="sort"
            onClick={handleRadioClick}
          />
          <label htmlFor="inc">Sort (price) Low to High</label>
        </div>
        <div>
          <input
            type="radio"
            id="dec"
            value="dec"
            name="sort"
            onClick={handleRadioClick}
          />
          <label htmlFor="dec">Sort (price) High to Low</label>
        </div>
      </div>
      <div className="foods">
        {filteredFoods.map((food) => {
          const { id, name, description, price, image, delivery_time } = food;
          const isInCart = cart.some((cartFood) => cartFood.id === id);
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
              {isInCart ? (
                <NavLink to="/cart">
                  <button>Go to Cart</button>
                </NavLink>
              ) : (
                <button onClick={() => handleAddToCartClick(food)}>
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuPage;
