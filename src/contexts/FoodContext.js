import React, { createContext, useEffect, useState } from "react";
import { fakeFetch } from "../Data";

export const ContextProvider = createContext();

export const FoodContext = ({ children }) => {
  const [foodsArr, setFoodsArr] = useState([]);
  const [cart, setCart] = useState([]);

  const handleAddToCartClick = (food) => {
    setCart((prev) => [...prev, food]);
  };

  useEffect(() => {
    fakeFetch("https://example.com/api/menu").then((data) => {
      setFoodsArr(data.data.menu);
    });
  }, []);

  return (
    <ContextProvider.Provider
      value={{ foodsArr, setFoodsArr, cart, setCart, handleAddToCartClick }}
    >
      {children}
    </ContextProvider.Provider>
  );
};
