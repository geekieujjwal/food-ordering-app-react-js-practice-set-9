import React, { createContext, useEffect, useState } from "react";
import { fakeFetch } from "../Data";

export const ContextProvider = createContext();

export const FoodContext = ({ children }) => {
  const [foodsArr, setFoodsArr] = useState([]);

  useEffect(() => {
    fakeFetch("https://example.com/api/menu").then((data) => {
      setFoodsArr(data.data.menu);
    });
  }, []);

  return (
    <ContextProvider.Provider value={{ foodsArr, setFoodsArr }}>
      {children}
    </ContextProvider.Provider>
  );
};
